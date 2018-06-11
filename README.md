# A URL Shortener

> An example app of Relay Modern and others

## Frameworks

- Framework: [Relay](https://facebook.github.io/relay/)
- Client: [React](https://reactjs.org/) + [Rebass](https://jxnblk.com/rebass/)
- Schema: [GraphQL](https://graphql.org/graphql-js/) + [Relay](https://github.com/graphql/graphql-relay-js)
- Server: [Express-GraphQL](https://github.com/graphql/express-graphql)
- Database: [NeDB](https://github.com/louischatriot/nedb)

## Install

```
yarn install
```

## Build and Run

Generate a GraphQL schema file:

```
yarn update-schema
```

Compile GraphQL queries for Relay:

```
yarn compile
```

Start a local server:

```
yarn start
```

The local server can be accessed at <http://localhost:3000> by default.

## Todos

WORK IN PROGRESS
