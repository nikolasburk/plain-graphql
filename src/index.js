const {
  parse,
  printSchema,
  validate,
  execute,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const fetchUserById = require('./sampleData')

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
  // The resolvers for `User` are not required, graphql-js infers its return values.
  // Uncomment the lines to see 
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

// Create and print SDL-representation of schema
// const sdlSchema = printSchema(schema)
// console.log(`Schema: \n${sdlSchema}`)

// Define the query
const queryString = `
{
  user(id: "abc") {
    id
    name
  }
}`
const queryAST = parse(queryString)

// Validate the query against the schema
const errors = validate(schema, queryAST)
if (errors.length === 0) {
  console.log(`Validation successful`)
} else {
  console.log(`Errors: ${JSON.stringify(errors)}`)
}

// Execute the query against the schema
execute(schema, queryAST).then(result => {
  console.log(`Execution result: \n${JSON.stringify(result)}`)
}).catch(e => console.log(JSON.stringify(e)))