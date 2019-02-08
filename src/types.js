
const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data 
const typeDefs = gql`

	type Speciality {
		Classification: String
	}

	type Provider {
		npi: String 
		lastName: String
		# this needs to be converted to Speciality
		classification: String
		postalCode: String
		gender: String
		fullName: String
		fullStreet: String
		fullCity: String
		businessPracticeLocationAddressTelephoneNumber: String
	}
	
	type Transaction {
		# this needs to be converted to ID
		id: String
		# this needs to be converted to a MySQL timestamp
		ts: String
		npi1: String
		npi2: String
		npi3: String
	}

	# The "Query" type is the root of all GraphQL queries.
	type Query {
		taxonomy: [Speciality]
		specialities: [Speciality]
		providers: [Provider]
		transactions: [Transaction]
	}

	# (A "Mutation" type will be covered later on.)
`;

exports.typeDefs=typeDefs;

