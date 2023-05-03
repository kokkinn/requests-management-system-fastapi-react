# Getting started

## Database

To start a database we
type `docker run --name pgc1 -e POSTGRES_PASSWORD=12345678 -e POSTGRES_USER=bigbox9 -d --rm
-v pg_volume_1:/var/lib/postgresql/data -p 54323:5432 postgres` command.

## API
To start an API we type `uvicorn main:app --host 0.0.0.0 --port 8000`

## Frontend
For client, we execute `npm start .` in client folder
