import sqlalchemy.engine
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from os import getenv

load_dotenv()

load_dotenv('.env')
load_dotenv('.envdb')

# DATABASE_URL = f'postgresql://{getenv("POSTGRES_USER")}:{getenv("POSTGRES_PASSWORD")}@0.0.0.0:5555/emails_db'
# for local development

DATABASE_URL = f'postgresql://{getenv("POSTGRES_USER")}:{getenv("POSTGRES_PASSWORD")}@database_container:5432/emails_db'


def create_db_engine() -> sqlalchemy.engine.Engine:
    return create_engine(DATABASE_URL, echo=True)


def get_db() -> Session:
    db: Session = session_local()
    try:
        yield db
    finally:
        db.close()


engine = create_db_engine()

session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False)
base_class_sqlalchemy = declarative_base()
