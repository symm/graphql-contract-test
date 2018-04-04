FROM node:alpine

RUN npm install -g graphql-contract-test@0.0.9

ENTRYPOINT ["graphql-contract-test"]
