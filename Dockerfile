FROM python:3.10
WORKDIR /code
COPY server/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./src /code/src
COPY server/.env /code/.env
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]
