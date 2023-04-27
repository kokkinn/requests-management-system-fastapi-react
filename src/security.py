from passlib.context import CryptContext
from sqlalchemy.orm import Session

from src import crud
from src.models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


# def check_input_vs_hash(input_pwd: str, db_session: Session) -> bool:
#     hashed_pwd = db_session.query(User).first().password
#     if verify_password(input_pwd, hashed_pwd):
#         return True
#     else:
#         return False


def authenticate_user(email: str, password: str, db_session) -> bool:
    db_user = crud.get_user(email, db_session)
    if not db_user:
        return False
    if not verify_password(password, db_session):
        return False
    return True
