from sqlalchemy.orm import Session

from src.emails.send_email import send_email
from src.schemas import EmailRequest as ER_Schema
from src.crud import create_request


def create_message(email_request: ER_Schema) -> str:
    return f"""\
Subject: Regarding kokkinn.com ...

Hi {email_request.name} {email_request.surname},\n
My name is George Washington,\n
I am a cool guy.\n
Please be free to ask any questions!"""


def handle_request(db_session: Session, email_request: ER_Schema):
    if not email_request.question:
        send_email(create_message(email_request), email_request.email)
    else:
        create_request(db_session, email_request)
