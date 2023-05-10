FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip install --upgrade pip
RUN pip install requests
RUN pip install Flask
RUN pip install numpy
RUN pip install opencv-python-headless
RUN pip install  Pyrebase4
RUN pip install tensorflow==2.11.0
EXPOSE 3000
CMD python ./main.py