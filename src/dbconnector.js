
var mysql=require("promise-mysql");
var constants = require("./constants.js");
var restapi = require('request-promise-native');

//helper function to access to MySQL
function GetDBData(query) {
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
		//console.log(JSON.stringify(results));
		//console.log(results);
		return results;
	});
}

//bellow all the graphql queries and mutations

function SpecialityList() {
	//return the results
	return GetDBData("SELECT Classification as name FROM taxonomy");
}

function SearchProviders(args){ 
	var classification = args.classification;
	var gender = args.gender;
	var postalCode = args.postalCode;
	var distance = args.distance;
	var lastName = args.lastName;
	var lastNameCount = 0;
	if (lastName) lastNameCount = lastName.length;

 	//check params
 	if(!postalCode && !lastNameCount && !classification){
		throw new Error('Too little parameters');
 	}
 	if(lastNameCount && !postalCode && !classification){
		throw new Error('Too little parameters');
 	}
 	if(postalCode && !lastNameCount && !classification){
		throw new Error('Too little parameters');
 	}
 	if(classification && !postalCode && !lastNameCount){
		throw new Error('Too little parameters');
 	}

	//building the query
 	var query = "SELECT NPI as npi, " +
		"Provider_Last_Name_Legal_Name as lastName, " +
		"Classification as classification, " +
		"Provider_Short_Postal_Code as postalCode, " +
		"Provider_Gender_Code as gender, " +
		"Provider_Full_Name as fullName, " +
		"Provider_Full_Street as fullStreet, " +
		"Provider_Full_City as fullCity, " +
		"Provider_Business_Practice_Location_Address_Telephone_Number as telephone " +
		"FROM npidata2 WHERE (";
 	if(lastNameCount)
 		query += "((Provider_Last_Name_Legal_Name = '" + lastName[0] + "')";
	for (var i=1; i<lastNameCount;i++){
 		query += " OR (Provider_Last_Name_Legal_Name = '" + lastName[i] + "')";
	}
 	if(lastNameCount)
 		query += ")";
 	if(gender)
 		if(lastNameCount)
 			query += " AND (Provider_Gender_Code = '" + gender + "')";
 		else
 			query += "(Provider_Gender_Code = '" + gender + "')";
 	if(classification)
 		if(lastNameCount || gender)
 			query += " AND (Classification = '" + classification + "')";
 		else
 			query += "(Classification = '" + classification + "')";
	
 	//case 1: no need to calculate zip codes at a distance
 	if (!distance || !postalCode){
 		if(postalCode)
			if(lastNameCount || gender || classification)
				query += " AND (Provider_Short_Postal_Code = '"+ postalCode + "')";
			else
				query += "(Provider_Short_Postal_Code = '" + postalCode + "')";
		query += ") limit 50";
 		
		//return the results
		return GetDBData(query);
	}
	
	//case 2:we need to find zipcodes at a distance

 	//rest api to get postal codes at a distance
 	var queryapi = "/rest/GFfN8AXLrdjnQN08Q073p9RK9BSBGcmnRBaZb8KCl40cR1kI1rMrBEbKg4mWgJk7/radius.json/" + postalCode + "/" + distance + "/mile";
	var options = {
  		uri: "http://zipcodedistanceapi.redline13.com" + queryapi,
		headers: {'User-Agent': 'Request-Promise'},
		json: true // Automatically parses the JSON string in the response
 	};

	//first we get the list of postal codes at that distance
	return restapi(options)
    .catch(function (err) {
		throw err;
    })
	//then we add the postal codes to the query
    .then(function (response) {
 		//no data
 		if (!response) {	
			throw new Error('postal codes search not working');
		}

		//how many postal codes
		var length=response.zip_codes.length;

		//complete the query with all postal codes
 		if(lastNameCount || gender || classification)
 			query += " AND ((Provider_Short_Postal_Code = '"+response.zip_codes[0].zip_code+"')";
 		else
 			query += "((Provider_Short_Postal_Code = '"+response.zip_codes[0].zip_code+"')";
		for (var i=1; i<length;i++){
 			query += " OR (Provider_Short_Postal_Code = '"+ response.zip_codes[i].zip_code +"')";
		}
  		query += ")) limit 50";

		//return the results
		return GetDBData(query);
	});		
}

function SearchProvider(args){ 
	var npi = args.npi;

 	//check params
 	if(!npi){
		throw new Error('Too little parameters');
 	}
			
	//building the query
 	var query = "SELECT NPI as npi, " +
		"Provider_Last_Name_Legal_Name as lastName, " +
		"Classification as classification, " +
		"Provider_Short_Postal_Code as postalCode, " +
		"Provider_Gender_Code as gender, " +
		"Provider_Full_Name as fullName, " +
		"Provider_Full_Street as fullStreet, " +
		"Provider_Full_City as fullCity, " +
		"Provider_Business_Practice_Location_Address_Telephone_Number as telephone " +
		"FROM npidata2 " +
		"WHERE NPI = "+npi;

	//return the results
	return GetDBData(query)
	.then(function(results){
		return results[0];
	});
}

function SearchBooking(args){ 
	var id = args.id;
	
 	//check params
 	if(!id){
		throw new Error('Too little parameters');
 	}
	
	//building the query
 	var query = "SELECT " +
		"id as id, " +
		"ts as ts, " +
		"NPI1 as npi1, " +
		"NPI2 as npi2, " +
		"NPI3 as npi3 " +
		"FROM transactions " +
		"WHERE id = "+id;

	//return the results
	return GetDBData(query)
	.then(function(results){
		return results[0];
	});
}

function BookProviders(args){ 
	var npi1 = args.npi1;
	var npi2 = args.npi2;
	var npi3 = args.npi3;

 	//check params
 	if(!npi1){
		throw new Error('Too little parameters');
 	}

	//building the query
	var query = "INSERT INTO transactions VALUES (DEFAULT,DEFAULT,'"+ npi1 +"','"+ npi2 +"','"+npi3 +"')";
	
	//return the results
	return GetDBData(query)
	.then(function(results){
		return SearchBooking({id: results.insertId});
	});
}

exports.SpecialityList=SpecialityList;
exports.SearchProviders=SearchProviders;
exports.SearchProvider=SearchProvider;
exports.SearchBooking=SearchBooking;
exports.BookProviders=BookProviders;
