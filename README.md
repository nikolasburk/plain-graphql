# GraphQL.js

A simple node script to demonstrate the difference in how to build a `GraphQLSchema` with `graphql-js` and `graphql-tools`. Check out the corresponding branch for more info:

- [graphql-js](https://github.com/nikolasburk/plain-graphql/tree/graphql-js)
- [graphql-tools](https://github.com/nikolasburk/plain-graphql/tree/graphql-tools)

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

## `graphql-js` vs `graphql-tools`

### `graphql-js`

```js

```


### `graphql-tools`

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
  },
  // Resolvers for `User` are not needed here: graphql-js infers the returned values.
  // Remove the comments to see that they're called when the query contains the `id` and `name` fields.
  // User: {
  //   id: (root, args, context, info) => {      
  //     console.log(`Resolver called: user.id`)   
  //     return root.id
  //   },
  //   name: (root, args, context, info) => {
  //     console.log(`Resolver called: user.name`) 
  //     return root.name
  //   },
  // },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
```

