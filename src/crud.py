from sqlalchemy.orm import Session

from src.emails.send_email import send_email
from src.security import get_password_hash
from src.schemas import EmailRequest as ER_Schema
from src.models import EmailRequest as ER_Model, User


def create_request(db_session: Session, request_schema: ER_Schema):
    db_request = ER_Model(**request_schema.dict())
    db_session.add(db_request)
    db_session.commit()
    return db_request


def read_request(db_session: Session, request_id: int):
    pass


def update_request(db_session: Session, request_answer: str, request_id: int):
    db_request = db_session.query(ER_Model).filter(ER_Model.id == request_id).first()
    send_email(request_answer, db_request.email)
    db_request.resolved = True
    db_session.commit()


def get_user(email: str, db_session: Session):
    db_user = db_session.query(User).filter(User.email == email).first()
    return db_user


def delete_request(db_session: Session, request_id: int):
    pass
