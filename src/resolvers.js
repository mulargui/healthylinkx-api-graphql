
//const samples = require("./samples.js");
const dbconnector = require("./dbconnector.js");
const { GraphQLDateTime } = require('graphql-iso-date');

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	DateTime: GraphQLDateTime,
	Transaction: { 
		providers: (parent) => {
			return BuildProvidersList(parent);
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

// helper function to get the providers of a transaction
function BuildProvidersList (parent) {
	var arr = []; 
	if (parent.npi1 == null) return arr;
	return dbconnector.SearchProvider({npi:parent.npi1})
	.then(function(result){
		if (result == undefined) return arr;
		if(result !== arr) arr.push(Object.assign({}, result));
		if (parent.npi2 == null) return arr;
		return dbconnector.SearchProvider({npi:parent.npi2});
	}).then(function(result){
		if (result == undefined) return arr;
		if(result !== arr) arr.push(Object.assign({}, result));
		if (parent.npi3 == null) return arr;
		return dbconnector.SearchProvider({npi:parent.npi3});
	}).then(function(result){
		if (result == undefined) return arr;
		if(result !== arr) arr.push(Object.assign({}, result));
		return arr;
	});
}

exports.resolvers=resolvers;



