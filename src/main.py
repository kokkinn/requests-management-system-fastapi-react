from typing import Annotated

from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from src.database import engine, get_db
from src.emails.email_utils import handle_request
from src import schemas, models, crud
from src.models import User
from src.schemas import DoResponseBody, Oath2LoginForm
from src.security import check_input_vs_hash, authenticate_user

app = FastAPI()
models.base_class_sqlalchemy.metadata.create_all(engine)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/send-email-request", status_code=status.HTTP_201_CREATED)
def send_email_request(email_request: schemas.EmailRequest, db_session: Session = Depends(get_db)):
    print(email_request)
    handle_request(db_session, email_request)
    return {"info": "I've tried"}


@app.post("/send-email-response", status_code=status.HTTP_200_OK)
def send_email_response(do_response_body: DoResponseBody, token: Annotated[str, Depends(oauth2_scheme)],
                        db_session: Session = Depends(get_db)):
    if check_input_vs_hash(do_response_body.provided_password, db_session):
        crud.update_request(db_session, do_response_body.message, do_response_body.request_id)
    else:
        raise HTTPException(detail='Incorrect credentials', status_code=status.HTTP_403_FORBIDDEN)
    return {"info": "I've tried"}


def fake_decode_token(token):
    return User(
        email=token + "fakedecoded", password='Sample'
    )


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user


@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user


@app.post("/token")
async def login(form_data: Oath2LoginForm, db_session: Session = get_db()):
    if not authenticate_user(form_data.email, form_data.password, db_session):
        raise HTTPException(detail='Incorrect credentials', status_code=status.HTTP_403_FORBIDDEN)
    # hashed_password = fake_hash_password(form_data.password)
    # if not hashed_password == user.hashed_password:
    #     raise HTTPException(status_code=400, detail="Incorrect username or password")
    #
    # return {"access_token": user.username, "token_type": "bearer"}
    return 'randomtoken'
