FROM node:alpine


WORKDIR /app

ENV PRISMA_ENDPOINT "https://maana-incubator.herokuapp.com/nlp"
COPY package.json /app
RUN npm install

COPY . /app

CMD npm start

EXPOSE 8050
