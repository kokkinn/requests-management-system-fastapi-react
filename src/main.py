from fastapi import FastAPI
from src.emails.email_utils import send_mail

from src import schemas

app = FastAPI()


@app.post("/mail-request")
def mail_request(email_request: schemas.EmailRequest):
    if email_request.question:
        pass
    else:
        send_mail(**email_request.dict())
    return {"message": "I've tried"}
