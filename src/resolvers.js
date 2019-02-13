
//const samples = require("./samples.js");
const dbconnector = require("./dbconnector.js");
const { GraphQLDateTime } = require('graphql-iso-date');

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	DateTime: GraphQLDateTime,
	Transaction: { 
		npi1: (parent) => {
			if (parent.npi1 == 'undefined') return undefined;
			return dbconnector.SearchProvider({npi:parent.npi1});
		},
		npi2: (parent) => { 
			if (parent.npi2 == 'undefined') return undefined;
			return dbconnector.SearchProvider({npi:parent.npi2});
		},
		npi3: (parent) => {
			if (parent.npi3 == 'undefined') return undefined;
			return dbconnector.SearchProvider({npi:parent.npi3});
		},
	},
	Query: {
		SpecialityList: () => { return dbconnector.SpecialityList();},
		SearchProviders(parent, args){ 
			return dbconnector.SearchProviders(args);
		},
		SearchProvider(parent, args){ 
			return dbconnector.SearchProvider(args);
		},
		SearchBooking(parent, args){ 
			return dbconnector.SearchBooking(args);
		},
	},
	Mutation: {
		BookProviders(parent, args){ 
			return dbconnector.BookProviders(args);
		},
	},
};

exports.resolvers=resolvers;



