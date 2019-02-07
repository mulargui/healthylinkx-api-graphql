
const samples = require("./samples.js");

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		specialities: () => samples.specialities,
		providers: () => samples.providers,
		transactions: () => samples.transactions,
	},
};

exports.resolvers=resolvers;
