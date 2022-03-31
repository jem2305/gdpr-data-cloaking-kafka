FROM python:3.10

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir --prefix=/usr/local -r requirements.txt

RUN chown 1001 /usr/src/app
USER 1001

COPY . .

CMD [ "python", "src/fraud_detection_etl.py" ]