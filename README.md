# GraphQL Contract Test

[![npm version](https://badge.fury.io/js/graphql-contract-test.svg)](https://badge.fury.io/js/graphql-contract-test)

Consumer driven contract testing for GraphQL APIs.

## Usage

```
graphql-contract-test http://your-server.tld/graphql client-schema.graphql
```

Where `client-schema.graphql` contains the schema you expect the server to implement.

An [introspection query](http://graphql.org/learn/introspection/) will be made against the API, any breaking changes will be reported


## Further Reading

* [Consumer-Driven Contracts: A Service Evolution Pattern](https://www.martinfowler.com/articles/consumerDrivenContracts.html)
* [Tech Radar Consumer-driven contract testing](https://www.thoughtworks.com/radar/techniques/consumer-driven-contract-testing)
