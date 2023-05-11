from sqlalchemy.orm import Session

from .schemas import EmailRequest as ER_Schema
from .models import EmailRequest as ER_Model
from .models import User


def create_request(db_session: Session, request_schema: ER_Schema):
    db_request = ER_Model(**request_schema.dict(), resolved=False)
    db_session.add(db_request)
    db_session.commit()
    return db_request


def get_request(request_id: int, db_session: Session):
    db_request = db_session.query(ER_Model).filter(ER_Model.id == request_id).first()
    return db_request


def read_requests(db_session: Session, resolved: bool = None, limit: int = None):
    if resolved is not None:
        return db_session.query(ER_Model).filter(ER_Model.resolved == resolved).limit(limit).all()
    return db_session.query(ER_Model).limit(limit).all()


def update_request(request_id: int, resolved: bool, db_session: Session):
    db_request = db_session.query(ER_Model).filter(ER_Model.id == request_id).first()
    db_request.resolved = resolved
    db_session.commit()
    return db_request


def get_user(email: str, db_session: Session):
    db_user = db_session.query(User).filter(User.email == email).first()
    return db_user


def delete_request(db_session: Session, request_id: int):
    db_session.query(ER_Model).filter(ER_Model.id == request_id).delete()
    db_session.commit()
