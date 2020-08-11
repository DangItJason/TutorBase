//This imports express.js and stores the module in the express variable
var express = require('express');
//Creates an instance of express that can be interacted with
var app = express();
//The bodyParser module allows us to read and send back data in the JSON format properly
var bodyParser = require('body-parser');
//Configure the bodyParser module for JSON properly with these two lines
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Data would usually be in the database, but for this test, will be here locally
var userData = [
	{
		"Username":"name1",
		"Password":"p1"
	},
	{
		"Username":"name2",
		"Password":"p2"
	},
	{
		"Username":"name3",
		"Password":"p3"
	}
];

//Basic get request, with first argument being the page -> here it is the homepage ('/')
//Second argument is a function that takes a request and a response 
app.get('/', function(req, res) {
	//Sends() is used be response to send something back to the client
	res.send(userData);
});

//Basic put request, with first argument being the page -> here it is the homepage ('/')
//This time, there is a URL parameter, denoted by the variable after the :
//This put request is used to update a value within the data set
app.put('/:userID', function(req, res) {
	//Similar to post request, get the new data from the request body
	var newPassword = req.body.Password;
	//Error check to ensure something was received (not an empty string)
	if (newPassword === "") {
		res.status(500).send("Error: no data received.");
	}
	else {
		//Keep track to see if we find the targeted piece of data
		var found = false;
		//Iterate through the data, looking for the data matching the URL parameter
		for (var i = 0; i < userData.length; i++) {
			var userID = req.params.userID;
			var d = userData[i];
			//We found the correct piece of data
			if (d.Username === userID) {
				userData[i].Password = newPassword;
				var found = true;
				break;
			}
		}
		//If the specified data was never found, send back an error message
		if (!found) {
			res.status(500).send("Error: object not found.");
		}
		//Otherwise, send back a success message
		else {
			res.status(200).send("Success.");
		}
	}
});

//Listen on port 3000, write to console when the connection is opened
app.listen(3000, function() {
	console.log("Running on port 3000.");
});

/* 
What this code does:

1.) We are importing and instantiating the express module, which handles
	a lot of the low-level work for us (also bodyParser, which helps with
	JSON handling from the Postman requests)

2.) We are listening on a port, and providing a callback function to run
	when a connection is started

3.) We are sending back a response to the client when the client goes to the
	page (making a get request)

4.) We are handling put requests, meaning we are updating data in our database
	with data that is sent to us from the client

How to run this:

1.) For this specific file, type node expressTest3.js into command line. You
	may have to install dependencies if the current directory does not already
	have a node_modules folder.

2.) The console.log inside the listen() callback function should appear on the
	command line, indicating a connection has been started.

3.) Going to localhost:3000/ in the browser, you should see the response message
	that has been sent and loaded to the browser (from the get request).

4.) Open Postman, and choose PUT, with destination localhost:3000/xxxxxx (replace the
	xxxxxx with any of the Username values in the data set) and type change from "text" 
	to "JSON".

5.) In the body, create a JSON object with anything in "Password". This will be the updated
	password for the username specified in the URL parameter.

6.) Press send and refresh the browser. The updated data should appear in the array there.
	Also, the success message should appear in the Postman console. If you want to
	test the error, send an object with an empty string "" in "Password", and the error
	message should appear in the Postman console.

Why we use this:

1.) When creating a REST API, there are four main operations: CRUD. This stands for Create,
	Read, Update, Delete. Although the code in each function above is technically
	interchangable, we organize it through the POST, GET, PUT, and DELETE requests. By
	supporting these 4 operations, we successfully implement a system for the user to
	communicate with the database through the server.

2.) We could also add an app.delete() function which would implement DELETE request, which
	would be similar to a PUT request, except we are removing the item from the data set
	instead of updating its value.
*/