import datetime
from typing import Optional
from pydantic import BaseModel, Field


class EmailRequest(BaseModel):
    name: str = Field(..., min_length=1)
    surname: str = Field(min_length=1)
    email: str = Field(..., min_length=3)
    question: Optional[str]

    class Config:
        orm_mode = True


class EmailRequestShow(EmailRequest):
    id: str
    resolved: bool
    created_date: datetime.datetime


class DoResponseBody(BaseModel):
    request_id: int
    message: str


class Oath2LoginForm(BaseModel):
    email: str
    password: str
