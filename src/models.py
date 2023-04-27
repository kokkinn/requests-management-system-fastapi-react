from src.database import base_class_sqlalchemy
from sqlalchemy import Column, String, Integer, Boolean


class EmailRequest(base_class_sqlalchemy):
    __tablename__ = 'requests'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String, nullable=True)
    email = Column(String)
    question = Column(String)
    resolved = Column(Boolean)


class User(base_class_sqlalchemy):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    password = Column(String)
