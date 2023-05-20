import asyncio
import datetime
from typing import Optional

from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from . import models
from . import schemas
from .crud import read_requests, update_request, get_request
from src import crud
from .emails.email_utils import handle_request
from .emails.send_email import send_email
from .security import authenticate_user, get_access_token_from_email, get_current_user
from .database import engine, get_db

app = FastAPI()
models.base_class_sqlalchemy.metadata.create_all(engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "OPTIONS", 'DELETE'],
    allow_headers=["*"],
)


async def delay():
    await asyncio.sleep(1)
    return 1  # TODO remove for deployment


@app.post("/submit-request", status_code=status.HTTP_201_CREATED)
def submit_request(email_request: schemas.EmailRequest, db_session: Session = Depends(get_db)):
    handle_request(db_session, email_request)
    return {"status": "ok",
            "request": email_request}


@app.post("/token")
async def get_token(form_data: schemas.Oath2LoginForm, delayq=Depends(delay), db_session: Session = Depends(get_db)):
    db_user = authenticate_user(form_data.email, form_data.password, db_session)
    if not db_user:
        raise HTTPException(detail='Incorrect credentials', status_code=status.HTTP_401_UNAUTHORIZED,
                            headers={"WWW-Authenticate": "Bearer"}, )
    access_token = get_access_token_from_email(db_user.email)
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/get-requests", response_model=dict[str, list[schemas.EmailRequestShow]])
def get_requests(date_sort: Optional[str], resolved: Optional[bool] = None, limit: Optional[int] = None,
                 db_session: Session = Depends(get_db), user=Depends(get_current_user),
                 delayy=Depends(delay)):  # TODO file with constants
    res = read_requests(db_session, resolved, limit, date_sort)
    return {"data": res}


@app.post("/resolve-request")
def resolve_request(resolve_body: schemas.DoResponseBody, db_session: Session = Depends(get_db),
                    user=Depends(get_current_user)
                    ):
    db_request = update_request(resolve_body.request_id, True, db_session)
    send_email(resolve_body.message, db_request.email)
    return {'details': 'ok'}


@app.get("/auth-test", status_code=status.HTTP_200_OK)
def auth_test(user=Depends(get_current_user), delayy=Depends(delay)):
    return user


@app.delete("/delete-request/{request_id}", status_code=status.HTTP_200_OK)
def delete_request(request_id: int, db_session=Depends(get_db),
                   # user=Depends(get_current_user)
                   ):
    db_request = get_request(request_id, db_session)
    if not db_request:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Request with such id do not exist')
    crud.delete_request(db_session, request_id)
    return {'details': 'deleted', 'request_id': request_id}
