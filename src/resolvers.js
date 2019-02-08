
const samples = require("./samples.js");
const dbconnector = require("./dbconnector.js");

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		taxonomy: 		() => { dbconnector.taxonomy();},
		specialities: 	() => samples.specialities,
		providers: 		() => samples.providers,
		transactions: 	() => samples.transactions,
	},
};

exports.resolvers=resolvers;
