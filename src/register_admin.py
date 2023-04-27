from sqlalchemy.orm import sessionmaker

from src.database import engine
from models import User
from src.security import get_password_hash

EMAIL = input('Enter an email: ')
PWD = get_password_hash(input('Enter a password: '))


session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False)
db_session = session_local()
new_admin = User(email=EMAIL, password=PWD)
db_session.add(new_admin)
db_session.commit()
print('New admin was created successfully!')
