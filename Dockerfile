# syntax = docker/dockerfile:experimental
FROM python:3.7.6-buster

RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt apt-get update \
	&& apt-get install -qq -y build-essential libpq-dev python3-setuptools --no-install-recommends

ENV PYTHONUNBUFFERED 1
USER root

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

RUN git clone https://github.com/holgern/beem.git 
WORKDIR /beem
RUN python setup.py build 
RUN python setup.py install --user