from typing import Optional

from pydantic import BaseModel, Field


class EmailRequest(BaseModel):
    name: str = Field(..., min_length=1)
    surname: Optional[str] = Field(min_length=1)
    email: str = Field(..., min_length=3)
    question: str = Field(..., min_length=1)

    class Config:
        orm_mode = True


class EmailRequestShow(EmailRequest):
    id: str
    resolved: bool


class DoResponseBody(BaseModel):
    request_id: int
    message: str


class Oath2LoginForm(BaseModel):
    email: str
    password: str
