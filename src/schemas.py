from typing import Optional

from pydantic import BaseModel


class EmailRequest(BaseModel):
    name: str
    surname: Optional[str]
    email: str
    question: str
