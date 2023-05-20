import re

from .database import get_db
from .models import User
from .security import get_password_hash
from .utils import is_email

print('Admin registration process has started ...')
email = None
while True:
    email = input('Please enter your email: ')
    if is_email(email):
        break
    print('This is not an email, please try again.')
PWD = get_password_hash(input('Please enter a password: '))
db_session = next(get_db())
new_admin = User(email=email, password=PWD)
db_session.add(new_admin)
db_session.commit()
print('New admin was created successfully!')
