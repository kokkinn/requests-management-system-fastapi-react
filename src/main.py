from typing import Annotated

from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from src.database import engine, get_db
from src.emails.email_utils import handle_request
from src import schemas, models
from src.schemas import DoResponseBody, Oath2LoginForm
from src.security import authenticate_user, get_access_token_from_email, get_current_user

app = FastAPI()
models.base_class_sqlalchemy.metadata.create_all(engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/send-email-request", status_code=status.HTTP_201_CREATED)
def send_email_request(email_request: schemas.EmailRequest, db_session: Session = Depends(get_db)):
    print(email_request)
    handle_request(db_session, email_request)
    return {"info": "I've tried"}


@app.post("/send-email-response", status_code=status.HTTP_200_OK)
def send_email_response(do_response_body: DoResponseBody, token: Annotated[str, Depends(oauth2_scheme)]):
    return {"info": "I've tried"}


# @app.get("/users/me")
# async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
#     return current_user


@app.post("/token")
def get_token(form_data: Oath2LoginForm, db_session: Session = Depends(get_db)):
    db_user = authenticate_user(form_data.email, form_data.password, db_session)
    if not db_user:
        raise HTTPException(detail='Incorrect credentials', status_code=status.HTTP_400_BAD_REQUEST,
                            headers={"WWW-Authenticate": "Bearer"}, )
    access_token = get_access_token_from_email(db_user.email)
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth-test")
def auth_test(user=Depends(get_current_user)):
    return user
