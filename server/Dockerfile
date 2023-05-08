FROM python:3.10
WORKDIR /code
COPY server/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY server/src /code/src
COPY server/.env /code/.env
COPY server/__init__.py /code/__init__.py
COPY database/.env /code/.envdb
RUN apt-get update && apt-get install -y vim
CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/api"]
