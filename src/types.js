
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
		# better converted to an array of Providers
		#providers: [Provider!]!
		npi1: Provider!
		npi2: Provider
		npi3: Provider
	}

	type Query {
		SpecialityList: [Speciality]
		SearchProviders(
			lastName: [String]
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

