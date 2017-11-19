FROM node:alpine

RUN npm install -g graphql-contract-test

ENTRYPOINT ["graphql-contract-test"]
