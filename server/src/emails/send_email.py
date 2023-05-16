import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from os import getenv
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()

SSL_PORT = 465
ACCOUNT = getenv('EMAIL_ACCOUNT')
PASSWORD = getenv('EMAIL_APP_PASSWORD')
SMTP_SERVER = getenv('SMTP_SERVER')


# msg = MIMEMultipart('alternative')
# msg['Subject'] = "Link"
# msg['From'] = 'tvo j'
# msg['To'] = 'kokkin.george@gmail.com'
# html = """\
# <html>
#   <head></head>
#   <body>
#     <p>Hi!<br>
#        <strong>How are you?</strong><br>
#        Here is the <a href="http://www.python.org">link</a> you wanted.
#     </p>
#   </body>
# </html>
# """
# part1 = MIMEText(html, 'html')
# msg.attach(part1)
# TODO currently in development


def send_email(message, recipient_email: str):
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, SSL_PORT, context=context) as server:
        server.login(ACCOUNT, PASSWORD)
        try:

            server.sendmail(ACCOUNT, recipient_email, message)
        except smtplib.SMTPRecipientsRefused:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bad email provided")
