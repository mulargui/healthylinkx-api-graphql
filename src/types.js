
const { gql } = require('apollo-server');
const { GraphQLDateTime } = require('graphql-iso-date');

// Type definitions define the "shape" of your data 
const typeDefs = gql`

	scalar DateTime
	
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
		id: String!
		ts: DateTime!
		# this needs to be converted to array of Provider
		#providers: [Provider!]!
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

