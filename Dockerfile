FROM python:3.8
WORKDIR /app
COPY . /app
RUN pip3 install --upgrade pip
RUN pip3 install requests-toolbelt==0.10.1
RUN pip3 install tensorflow-cpu --no-cache-dir
RUN pip3 install opencv-python-headless==4.7.0.68
RUN pip3 install Pyrebase4
RUN pip3 install Flask
RUN pip3 install numpy
RUN pip3 install uvicorn

