FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN  apt-get update && \
     apt-get install -y build-essential python nodejs npm && \
     npm install bcrypt@latest --save && \
     npm install node-gyp@latest -g

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm install

EXPOSE 8084
CMD [ "npm", "start" ]
