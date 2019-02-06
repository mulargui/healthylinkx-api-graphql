
const { ApolloServer, gql } = require('apollo-server');

// These are sample collections
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const specialities = [
	{ name: 'one'},
	{ name: 'two'},
	{ name: 'three'},
];

const providers = [
	{
		npi: '1',
		lastName: 'Cain',
		classification: 'one',
		postalCode: '98052',
		gender: 'M',
		fullName: 'Kevin Cain',
		fullStreet: 'One Bellevue Way',
		fullCity: 'Bellevue',
		businessPracticeLocationAddressTelephoneNumber: 'One Bellevue Way, Bellevue, 4254493456',
	},
	{
		npi: '2',
		lastName: 'Scott',
		classification: 'one',
		postalCode: '98052',
		gender: 'F',
		fullName: 'Bob Scott',
		fullStreet: 'Two Bellevue Way',
		fullCity: 'Bellevue',
		businessPracticeLocationAddressTelephoneNumber: 'Two Bellevue Way, Bellevue, 4254493457',
	},
	{
		npi: '3',
		lastName: 'Ulargui',
		classification: 'two',
		postalCode: '98052',
		gender: 'M',
		fullName: 'Mauricio Ulargui',
		fullStreet: 'Three Bellevue Way',
		fullCity: 'Bellevue',
		businessPracticeLocationAddressTelephoneNumber: 'Three Bellevue Way, Bellevue, 4254493452',
	},
	{
		npi: '4',
		lastName: 'Pope',
		classification: 'two',
		postalCode: '98052',
		gender: 'M',
		fullName: 'Big Pope',
		fullStreet: 'Four Bellevue Way',
		fullCity: 'Bellevue',
		businessPracticeLocationAddressTelephoneNumber: 'Four Bellevue Way, Bellevue, 4254493453',
	},
	{
		npi: '5',
		lastName: 'Roberts',
		classification: 'three',
		postalCode: '98052',
		gender: 'F',
		fullName: 'Great Roberts',
		fullStreet: 'Five Bellevue Way',
		fullCity: 'Bellevue',
		businessPracticeLocationAddressTelephoneNumber: 'Five Bellevue Way, Bellevue, 4254493454',
	},
];

const transactions = [
	{
		id: '1',
		ts: '20180205',
		npi1: '1',
		npi2: '2',
		npi3: '3',
	},
	{
		id: '2',
		ts: '20180205',
		npi1: '1',
		npi2: '2',
		npi3: '4',
	},
	{
		id: '3',
		ts: '20180206',
		npi1: '1',
		npi2: '3',
		npi3: '5',
	},
];

// Type definitions define the "shape" of your data 
const typeDefs = gql`
	# Comments in GraphQL are defined with the hash (#) symbol.

	# This "Book" type can be used in other type declarations.
	type Book {
		title: String
		author: String
	}
  
	type Speciality {
		name: String
	}

	type Provider {
		npi: String 
		lastName: String
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
		providers: [Provider]
		specialities: [Speciality]
		transactions: [Transaction]
	}

	# (A "Mutation" type will be covered later on.)
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		specialities: () => specialities,
		providers: () => providers,
		transactions: () => transactions,
	},
};

// start the server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

