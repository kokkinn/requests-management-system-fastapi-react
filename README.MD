# Requests Management System

## About

It is an app which is used for managing 'requests' or questions from the users (after submitting
a 'contact me' or 'leave your wish' form).
It consists of an API (FastAPI) to handle things and admin panel (React) which is a user interface.
Everything is stored on a Postgres database.

## Getting started

Clone the repo to your machine.

### Email account

The first ever thing to do is set up an email account used for your replies to users.
Any smtp server could be used. The related data must be provided in `server/.env` (create it) and filled using
`server/.env.template` file.

### Docker

To get the app working, a Docker needs to be installed on the system. From the root directory, create `.env` file and
fill it using `.env.template` provided. To start the containers stack, be sure to be on the
`docker-compose.yml` file level, then execute `docker-compose up --build`. After the process
is done, the port 80 will be exposed to your machine, where frontend is located.
