


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

