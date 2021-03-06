const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/toDo");
const typeDefs = `
type Query {
    hello(name: String): String!
}
`
const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'})`,
    },
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once("open", function () {
    server.start(() => console.log('Server is running on localhost:4000!'))
})
