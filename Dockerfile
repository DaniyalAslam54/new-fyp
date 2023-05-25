FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip3 install --upgrade pip
RUN pip3 install tensorflow-cpu --no-cache-dir
RUN pip3 install opencv-python-headless==4.7.0.68
RUN pip3 install pyrebase4
RUN pip3 install Flask
RUN pip3 install numpy
EXPOSE 4000
CMD python ./main.py
