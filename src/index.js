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
const fetchUserById = require('./sampleData')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLID,
      // `resolve` is not needed here: graphql-js infers the returned value.
      // Remove the comments to see that it's called when the query contains the `id` field.
      // resolve: (root, args, context, info) => {
      //   console.log(`Resolver called: user.id`)
      //   return root.id
      // }
    },
    name: { 
      type: GraphQLString,
      // `resolve` is not needed here: graphql-js infers the returned value.
      // Remove the comments to see that it's called when the query contains the `name` field.
      // resolve: (root, args, context, info) => {
      //   console.log(`Resolver called: user.name`)
      //   return root.name
      // }
    }
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