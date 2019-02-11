
const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data 
const typeDefs = gql`

	type Speciality {
		name: String!
	}

	type Provider {
		npi: String! 
		lastName: String!
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
		id: String!
		# this needs to be converted to a MySQL timestamp
		ts: String!
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
		#it should return one not an array
		SearchProvider(
			npi: String!
		): [Provider]
		#it should return one not an array
		SearchBooking(
			id: String!
		): [Transaction]
	}
	
	type Mutation {
		#it should return one not an array
		BookProviders(
			npi1: String!
			npi2: String
			npi3: String
		): [Transaction]
	}
`;

exports.typeDefs=typeDefs;

