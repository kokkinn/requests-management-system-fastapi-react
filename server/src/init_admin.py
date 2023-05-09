from .database import get_db
from .models import User
from .security import get_password_hash

print('Admin registration process has started ...')
EMAIL = input('Please enter your email: ')  # TODO handle empty string
PWD = get_password_hash(input('Please enter a password: '))

db_session = next(get_db())
new_admin = User(email=EMAIL, password=PWD)
db_session.add(new_admin)
db_session.commit()
print('New admin was created successfully!')
