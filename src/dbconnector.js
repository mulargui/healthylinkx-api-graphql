
var mysql=require("promise-mysql");
var constants = require("./constants.js");

function taxonomy() {
	return mysql.createConnection({
		host:constants.host,
		user:constants.user,
		password:constants.password,
		database:constants.database
	}).then(function(conn){
		connection = conn;
		return connection.query("SELECT Classification as name FROM taxonomy");
	}).then(function(results){
		connection.end();
		return results;
	});
}

function providers(args){ 
	var lastName1 = args.lastName1;
	var lastName2 = args.lastName2;
	var lastName3 = args.lastName3;
	var classification = args.classification;
	var gender = args.gender;
	var postalCode = args.postalCode;
	var distance = args.distance;

	//building the query
 	var query = "SELECT NPI as npi, " +
		"Provider_Last_Name_Legal_Name as lastName, " +
		"Classification as classification, " +
		"Provider_Short_Postal_Code as postalCode, " +
		"Provider_Gender_Code as gender, " +
		"Provider_Full_Name as fullName, " +
		"Provider_Full_Street as fullStreet, " +
		"Provider_Full_City as fullCity, " +
		"Provider_Business_Practice_Location_Address_Telephone_Number as businessPracticeLocationAddressTelephoneNumber " +
		"FROM npidata2 WHERE (";
 	if(lastName1)
 		query += "((Provider_Last_Name_Legal_Name = '" + lastName1 + "')";
 	if(lastName2)
 		query += " OR (Provider_Last_Name_Legal_Name = '" + lastName2 + "')";
 	if(lastName3)
 		query += " OR (Provider_Last_Name_Legal_Name = '" + lastName3 + "')";
 	if(lastName1)
 		query += ")";
 	if(gender)
 		if(lastName1)
 			query += " AND (Provider_Gender_Code = '" + gender + "')";
 		else
 			query += "(Provider_Gender_Code = '" + gender + "')";
 	if(classification)
 		if(lastName1 || gender)
 			query += " AND (Classification = '" + classification + "')";
 		else
 			query += "(Classification = '" + classification + "')";
	
 	//case 1: no need to calculate zip codes at a distance
 	//if (!distance){
 		if(lastName1 || gender || classification)
 			query += " AND (Provider_Short_Postal_Code = '"+ postalCode + "')";
 		else
 			query += "(Provider_Short_Postal_Code = '" + postalCode + "')";
		query += ") limit 50";
 		
		return mysql.createConnection({
			host:constants.host,
			user:constants.user,
			password:constants.password,
			database:constants.database
		}).then(function(conn){
			connection = conn;
			return connection.query(query);
		}).then(function(results){
			connection.end();
			console.log(JSON.stringify(results));
			return results;
		});
	//}
}

exports.taxonomy=taxonomy;
exports.providers=providers;
