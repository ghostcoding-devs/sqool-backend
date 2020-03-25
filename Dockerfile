FROM node:12-alpine
WORKDIR /usr/src/app
ARG userName
ARG authToken

COPY . . 
RUN npm install --only-production

EXPOSE 8080
CMD [ "npm", "start" ]
