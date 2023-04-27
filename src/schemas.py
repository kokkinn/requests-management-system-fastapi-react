from typing import Optional

from pydantic import BaseModel


class EmailRequest(BaseModel):
    name: str
    surname: Optional[str]
    email: str
    question: str
    resolved: bool = False


class DoResponseBody(BaseModel):
    request_id: int
    message: str
    provided_password: str


class Oath2LoginForm(BaseModel):
    email: str
    password: str
