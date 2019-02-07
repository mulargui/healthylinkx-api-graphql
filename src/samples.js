

// These are sample collections
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

exports.specialities=specialities;
exports.providers=providers;
exports.transactions=transactions;
