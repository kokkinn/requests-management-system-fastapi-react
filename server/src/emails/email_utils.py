import re

from sqlalchemy.orm import Session
from ..schemas import EmailRequest as ER_Schema
from ..crud import create_request
from .send_email import send_email


def get_default_msg(email_request: ER_Schema) -> str:
    default_msg = open('message.txt', 'r').read()
    default_msg = re.sub('{phn}', email_request.name, default_msg)
    default_msg = re.sub('{phs}', email_request.surname, default_msg)
    return default_msg


def handle_request(db_session: Session, email_request: ER_Schema):
    if not email_request.question:
        send_email(get_default_msg(email_request), email_request.email)
    else:
        create_request(db_session, email_request)
