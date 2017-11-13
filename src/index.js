const {
  parse,
  printSchema,
  buildASTSchema,
  Source,
  validate,
  execute,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const {
  makeExecutableSchema
} = require('graphql-tools')

console.log(`Run script...`)

// construct GraphQLSchema instance
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(_, args) {
          return `Hello ${args.name || 'World'}`
        },
        args: {
          name: {
            type: GraphQLString
          }
        }
      }
    }
  })
})

// const schemaString = `
// type Query {
//   hello: String!
// }`

// const resolverMap = {
//   Query: {
//     hello: () => 'world'
//   }
// }

// const schema = makeExecutableSchema({
//   typeDefs: schemaString,
//   resolvers: resolverMap,
// })

// console.log(`Executable Schema: ${JSON.stringify(schema)}`)

// // parse(source: Source | string, options?: ParseOptions): Document
// const schemaAST = parse(schemaString) // creates AST as JS object
// console.log(`AST: \n${JSON.stringify(schemaAST)}\n`)

// // buildASTSchema(ast: Document): GraphQLSchema
// const schema = buildASTSchema(schemaAST)
// console.log(`Schema: \n${JSON.stringify(schema)}\n`)

const printedSchema = printSchema(schema)
console.log(`Printed: \n${printedSchema}`)

const queryString = `
{
  hello(name: "X")
}`
const queryAST = parse(queryString)

// const errors = validate(schema, queryAST)
// if (errors.length === 0) {
//   console.log(`Validation successful`)  
// } else {
//   console.log(`Errors: ${JSON.stringify(errors)}`)    
// }

execute(schema, queryAST).then(result => {
  console.log(`Execution result: \n${JSON.stringify(result)}`)
})