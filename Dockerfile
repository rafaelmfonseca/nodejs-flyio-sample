FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV DOCKERFILE_SECRET1="Some value here"
ENV DOCKERFILE_SECRET2=AnotherValueHere
CMD [ "npm", "start" ]
