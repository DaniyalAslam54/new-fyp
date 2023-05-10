FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip install --upgrade pip
RUN pip install tensorflow==2.11.0
RUN pip install -r requirements.txt 
EXPOSE 3000
CMD python ./main.py
