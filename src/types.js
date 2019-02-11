
const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data 
const typeDefs = gql`

	type Speciality {
		name: String!
	}

	type Provider {
		npi: String! 
		lastName: String!
		classification: String
		postalCode: String
		gender: String
		fullName: String
		fullStreet: String
		fullCity: String
		telephone: String
	}
	
	type Transaction {
		# this needs to be converted to ID
		id: String!
		# this needs to be converted to a MySQL timestamp
		ts: String!
		# this needs to be converted to array of Provider
		npi1: String!
		npi2: String
		npi3: String
	}

	type Query {
		SpecialityList: [Speciality]
		SearchProviders(
			lastName1: String
			lastName2: String
			lastName3: String
			classification: String
			gender: String
			postalCode: String
			distance: Int
		): [Provider]
		SearchProvider(
			npi: String!
		): Provider
		SearchBooking(
			id: String!
		): Transaction
	}
	
	type Mutation {
		BookProviders(
			npi1: String!
			npi2: String
			npi3: String
		): Transaction
	}
`;

exports.typeDefs=typeDefs;

