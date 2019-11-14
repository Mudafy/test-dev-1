ARG PYTHON_VERSION=3
ARG BUILD_VERSION=latest

# Pull base image
FROM python:${PYTHON_VERSION} as python-final

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT production
ENV DEBUG False

WORKDIR /code

COPY gunicorn /gunicorn

# Install dependencies
COPY requirements.txt .
RUN pip install -U pip gunicorn \
    && pip install -r ./requirements.txt \
    && rm -rf /root/.cache/pip/*

# Copy project
COPY . /code/

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
EXPOSE 3000 8000
STOPSIGNAL SIGINT
ENTRYPOINT ["/docker-entrypoint.sh"]
