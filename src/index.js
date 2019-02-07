
const { ApolloServer} = require('apollo-server');
const types = require("./types.js");
const resolvers = require("./resolvers.js");

// start the server
const server = new ApolloServer({ typeDefs:types.typeDefs, resolvers: resolvers.resolvers });
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

