import smtplib
import ssl
from os import getenv
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()

SSL_PORT = 465
ACCOUNT = getenv('EMAIL_ACCOUNT')
PASSWORD = getenv('EMAIL_APP_PASSWORD')
TEST_RECIPIENT = 'kokkin.george@gmail.com',


def send_email(message: str, recipient_email: str):
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", SSL_PORT, context=context) as server:
        server.login(ACCOUNT, PASSWORD)
        try:
            server.sendmail(ACCOUNT, recipient_email, message)
        except smtplib.SMTPRecipientsRefused:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bad email provided")
