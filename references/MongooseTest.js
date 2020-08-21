var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//Import the Mongoose library
var mongoose = require('mongoose');
//Create a new database, called new-db
var db = mongoose.connect('mongodb://localhost/new-db');
//Importing the model example, user
var User = require('./user');

//Used for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Used to start the server on the specified port number
app.listen(3000, function() {
	console.log("Running on port 3000.");
});

//This POST request communicates with the database to insert a document into the users collection
app.post('/user', function(req, res) {
	//Create a new user, store the data from the client in the document's fields
	var user = new User();
	user.userName = req.body.userName;
	user.Password = req.body.Password;
	user.GraduationYear = req.body.GraduationYear;
	user.Major = req.body.Major;
	//Save the new document to the collection
	user.save(function(err, newUser) {
		//Return error message
		if (err) {
			res.status(500).send({error: "Error when trying to save user."});
		}
		//Return success and the newly inserted document
		else {
			res.status(200).send(newUser);
		}
	});
});

//This GET request communicates with the database to retrieve the documents in the users collection
app.get('/user', function(req, res) {
	//Finds the users and puts them into an array of documents in users
	User.find({}, function(err, users) {
		//Return error message
		if (err) {
			res.status(500).send({error: "Error when trying to get users."});
		}
		//Return success and the array of users
		else {
			res.status(200).send(users);
		}
	});
});

/*
To start the server:

1.) Enter "mongod" in one terminal
2.) Enter "node MongooseTest.js" in another terminal
3.) Enter "mongo" into another terminal (enter "show dbs" to see active databases)


To test:

1.) Send a post request using Postman
2.) You should see the database, collection, and the document in the mongo shell (if successful)
3.) Send a get request using Postman
4.) You should see the documents from the database being returned
*/