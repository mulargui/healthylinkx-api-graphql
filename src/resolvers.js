
//const samples = require("./samples.js");
const dbconnector = require("./dbconnector.js");
const { GraphQLDateTime } = require('graphql-iso-date');

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	DateTime: GraphQLDateTime,
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



