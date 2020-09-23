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
var data = [
	{
		"Data":"Message 1",
		"Number":1
	},
	{
		"Data":"Message 2",
		"Number":2
	}
];

//Basic get request, with first argument being the page -> here it is the homepage ('/')
//Second argument is a function that takes a request and a response 
app.get('/', function(req, res) {
	//Sends() is used be response to send something back to the client
	res.send(data);
});

//Basic post request, with first argument being the page -> here it is the homepage ('/')
//Second argument is a function that takes a request and a response
app.post('/', function(req, res) {
	//Store the body of the post request in newData
	var newData = req.body;
	//Error check to make sure the new data being added is number 3
	if (newData.Number != 3) {
		//Set status to 500, indicating server error, and send error message to client
		res.status(500).send("Error: wrong data received.");
	}
	//Add the data to the local array
	else {
		data.push(newData);
		//Set status to 200, indicating "OK", and send success message to client
		res.status(200).send("Success.");
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

4.) We are handling post requests, meaning when a request with data in a body
	is sent, we read the data and send back a status messages

How to run this:

1.) For this specific file, type node expressTest2.js into command line. You
	may have to install dependencies if the current directory does not already
	have a node_modules folder.

2.) The console.log inside the listen() callback function should appear on the
	command line, indicating a connection has been started.

3.) Going to localhost:3000/ in the browser, you should see the response message
	that has been sent and loaded to the browser (from the get request).

4.) Open Postman, and choose POST, with destination localhost:3000 and type change
	from "text" to "JSON".

5.) In the body, create a JSON object with anything in "Data", but with 3 in "Number".

6.) Press send and refresh the browser. The new data should appear in the array there.
	Also, the success message should appear in the Postman console. If you want to
	test the error, send an object with anything except 3 in "Number", and the error
	message should appear in the Postman console.
*/