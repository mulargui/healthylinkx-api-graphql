
var mysql=require("promise-mysql");
var constants = require("./constants.js");
var restapi = require('request-promise-native');

function SpecialityList() {
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

function SearchProviders(args){ 
	var lastName1 = args.lastName1;
	var lastName2 = args.lastName2;
	var lastName3 = args.lastName3;
	var classification = args.classification;
	var gender = args.gender;
	var postalCode = args.postalCode;
	var distance = args.distance;

 	//check params
 	if(!postalCode && !lastName1 && !classification){
		throw new Error('Too little parameters');
 	}
 	if(lastName1 && !postalCode && !classification){
		throw new Error('Too little parameters');
 	}
 	if(postalCode && !lastName1 && !classification){
		throw new Error('Too little parameters');
 	}
 	if(classification && !postalCode && !lastName1){
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
 	if (!distance || !postalCode){
 		if(postalCode)
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
			return results;
		});
	}
	
	//case 2:we need to find zipcodes at a distance

 	//lets get a few zipcodes
 	var queryapi = "/rest/GFfN8AXLrdjnQN08Q073p9RK9BSBGcmnRBaZb8KCl40cR1kI1rMrBEbKg4mWgJk7/radius.json/" + postalCode + "/" + distance + "/mile";
	var responsestring="";

	var options = {
  		uri: "http://zipcodedistanceapi.redline13.com" + queryapi,
		headers: {'User-Agent': 'Request-Promise'},
		json: true // Automatically parses the JSON string in the response
 	};

	return restapi(options)
    .catch(function (err) {
		throw err;
    })
    .then(function (response) {
 		//no data
 		if (!response) {	
			throw new Error('postal codes search not working');
		}

		var length=response.zip_codes.length;

		//complete the query
 		if(lastName1 || gender || classification)
 			query += " AND ((Provider_Short_Postal_Code = '"+response.zip_codes[0].zip_code+"')";
 		else
 			query += "((Provider_Short_Postal_Code = '"+response.zip_codes[0].zip_code+"')";
		for (var i=1; i<length;i++){
 			query += " OR (Provider_Short_Postal_Code = '"+ response.zip_codes[i].zip_code +"')";
		}
  		query += ")) limit 50";

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
			console.log(results);
			return results;
		});
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
		return SearchBooking({id: results.insertId});
	});
}

exports.SpecialityList=SpecialityList;
exports.SearchProviders=SearchProviders;
exports.SearchProvider=SearchProvider;
exports.SearchBooking=SearchBooking;
exports.BookProviders=BookProviders;
