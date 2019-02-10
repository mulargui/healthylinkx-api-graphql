
const samples = require("./samples.js");
const dbconnector = require("./dbconnector.js");

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		taxonomy: () => { return dbconnector.taxonomy();},
		providers(parent, args){ 
			return dbconnector.providers(args);
		},
		transactions: 	() => samples.transactions,
	},
};

exports.resolvers=resolvers;



