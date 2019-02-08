
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
		return connection.query("SELECT * FROM taxonomy");
	}).then(function(results){
		connection.end();
		console.log(JSON.stringify(results));
		return JSON.stringify(results);
	});
}

exports.taxonomy=taxonomy;

