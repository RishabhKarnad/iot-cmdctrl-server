FROM node:16.15.1-alpine3.15

COPY ./ /bin
WORKDIR /bin

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
