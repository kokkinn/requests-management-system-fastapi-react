import smtplib
import ssl
from os import getenv
from dotenv import load_dotenv

load_dotenv()

SSL_PORT = 465
ACCOUNT = getenv('EMAIL_ACCOUNT')
PASSWORD = getenv('EMAIL_APP_PASSWORD')
TEST_RECIPIENT = 'kokkin.george@gmail.com',


def send_mail(name: str, surname: str, email: str, question: str = None):
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", SSL_PORT, context=context) as server:
        server.login(ACCOUNT, PASSWORD)
        msg_temp = f'Hi {name} {surname}. Regarding your {question}...'
        server.sendmail(ACCOUNT, email, msg_temp)
