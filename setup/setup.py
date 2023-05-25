from os import listdir, path
import secrets

STATUSES = {'yes': ['yes', 'true', 'y', '1'], 'no': ['no', 'false', 'n', '0']}
ENV_SE_PATH = path.dirname(__file__) + '/../server/'
ENV_DB_PATH = path.dirname(__file__) + '/../database/'
ENV_NAME = '.env'


# TODO try jinja2
def env_filling():
    if ENV_NAME in listdir(ENV_DB_PATH) or ENV_NAME in listdir(ENV_SE_PATH):
        while True:
            status = str(input('Env file already exists, do you wish to override it ? [Yes / No]: ').lower().strip())
            if status in STATUSES.get('yes'):
                break
            elif status in STATUSES.get('no'):
                return 0
            else:
                print('Incorrect option')
                continue

    with open(path.dirname(__file__) + f'/../server/{ENV_NAME}', 'w') as env_server:
        email = input('Your email account name: ')
        pwd = input('Your email account password: ')
        smtp = input('Your email smtp server: ')
        secret_key = secrets.token_hex(32)
        env_file_content = f"EMAIL_ACCOUNT={email}\nEMAIL_APP_PASSWORD={pwd}\nSMTP_SERVER={smtp}\nSECRET_KEY={secret_key}"
        env_server.write(env_file_content)

    with open(path.dirname(__file__) + f'/../database/{ENV_NAME}', 'w') as env_database:
        user = input('Your database username: ')
        pwd = input('Your database password: ')
        env_file_content = f"POSTGRES_USER={user}\nPOSTGRES_PASSWORD={pwd}\n"
        env_database.write(env_file_content)

    print('Data was submitted successfully. /server/src/.env and /database/.env files are now ready to be used.')


env_filling()
