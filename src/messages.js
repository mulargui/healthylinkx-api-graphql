


 	//case 2:we need to find zipcodes at a distance

 	//lets get a few zipcodes
 	var queryapi = "/rest/GFfN8AXLrdjnQN08Q073p9RK9BSBGcmnRBaZb8KCl40cR1kI1rMrBEbKg4mWgJk7/radius.json/" + zipcode + "/" + distance + "/mile";
	var responsestring="";

	var options = {
  		host: "zipcodedistanceapi.redline13.com",
  		path: queryapi
 	};

	var req = require("http").request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			responsestring += chunk;
		});

		res.on('error', function(e) {
			throw e;
		});	

		res.on('end', function() {

			//no data
  			if (!responsestring) {	
				reply(response, 204, '');
				return;
 			}

		 	//translate json from string to array
			var responsejson = JSON.parse(responsestring);
			var length=responsejson.zip_codes.length;

			//complete the query
 			if(lastname1 || gender || specialty)
 				query += " AND ((Provider_Short_Postal_Code = '"+responsejson.zip_codes[0].zip_code+"')";
 			else
 				query += "((Provider_Short_Postal_Code = '"+responsejson.zip_codes[0].zip_code+"')";
			for (var i=1; i<length;i++){
 				query += " OR (Provider_Short_Postal_Code = '"+ responsejson.zip_codes[i].zip_code +"')";
			}
  			query += ")) limit 50";

			db.query(query, function(err,results,fields){		
				if (err) throw err;
				reply(response, 200, results);
			});
		});
	}).end();		
}

function transaction(request, response) {
	var params = url.parse(request.url,true).query; 
	var id=params.id;
 
 	//check params
 	if(!id){
		reply(response, 204, '');
		return;
 	}

	//retrieve the providers
	var query = "SELECT * FROM transactions WHERE (id = '"+id+"')";
 	var db=connectdb();
	db.query(query, function(err,results,fields){		
		if (err) throw err;

		if (results.length <= 0){
			reply(response, 204, '');
			return;
 		}

		//get the providers
		var npi1 = results[0].NPI1;
		var npi2 = results[0].NPI2;
		var npi3 = results[0].NPI3;
	
		//get the details of the providers
		query = "SELECT NPI,Provider_Full_Name,Provider_Full_Street, Provider_Full_City, Provider_Business_Practice_Location_Address_Telephone_Number FROM npidata2 WHERE ((NPI = '"+npi1+"')";
		if(npi2)
			query += "OR (NPI = '"+npi2+"')";
		if(npi3)
			query += "OR (NPI = '"+npi3+"')";
		query += ")";

 		db.query(query, function(err,results,fields){		
			if (err) throw err;
			reply(response, 200, results);
		});
	});
}

function shortlist(request, response) {
	var params = url.parse(request.url,true).query; 
	var npi1 = params.NPI1;
	var npi2 = params.NPI2;
	var npi3 = params.NPI3;

 	//check params
 	if(!npi1){
		reply(response, 204, '');
		return;
 	}
	
	//save the selection
	var query = "INSERT INTO transactions VALUES (DEFAULT,DEFAULT,'"+ npi1 +"','"+ npi2 +"','"+npi3 +"')";
	var db=connectdb();
 	db.query(query, function(err,results,fields){		
		if (err) throw err;

		//keep the transaction number
		var transactionid= results.insertId;
			
		//return detailed data of the selected providers
		query = "SELECT NPI,Provider_Full_Name,Provider_Full_Street, Provider_Full_City, Provider_Business_Practice_Location_Address_Telephone_Number FROM npidata2 WHERE ((NPI = '"+npi1+"')";
		if(npi2)
			query += "OR (NPI = '"+npi2+"')";
		if(npi3)
			query += "OR (NPI = '"+npi3+"')";
		query += ")";

 		db.query(query, function(err,results,fields){		
			if (err) throw err;
			
			var info=[{Transaction: transactionid}];
			info.push(results);
			reply(response, 200, info);
		});
	});
}

exports.taxonomy=taxonomy;
exports.providers=providers;
exports.shortlist=shortlist;
exports.transaction=transaction;
