# GraphQL.js

A simple node script to demonstrate the difference in how to build a `GraphQLSchema` with `graphql-js` and `graphql-tools`. Check out the corresponding branch for more info:

- [graphql-js](https://github.com/nikolasburk/plain-graphql/tree/graphql-js)
- [graphql-tools](https://github.com/nikolasburk/plain-graphql/tree/graphql-tools)

Read the full article [here](https://medium.com/@graphcool/graphql-server-basics-the-schema-ac5e2950214e).

## Usage

### Grab code from this branch

```sh
git clone -b graphql-js git@github.com:nikolasburk/plain-graphql.git
```

### Install dependencies and run the script

```sh
cd plain-graphql
yarn install
yarn start
```

## graphql-js vs graphql-tools

### Creating the `GraphQLSchema` with graphql-js

```js
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: (root, args, context, info) => {
          console.log(`Resolver called: user`)
          return fetchUserById(args.id)
        }
      }
    }
  })
})
```


### Creating the `GraphQLSchema` with graphql-tools

```js
const { makeExecutableSchema } = require('graphql-tools')

// Define schema in SDL
const typeDefs = `
type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String
}`

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      console.log(`Resolver called: user`)
      return fetchUserById(args.id)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
```