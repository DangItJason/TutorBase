//This imports express.js and stores the module in the express variable
var express = require('express');
//Creates an instance of express that can be interacted with
var app = express();

//Basic get request, with first argument being the page -> here it is the homepage ('/')
//Second argument is a function that takes a request and a response 
app.get('/', function(req, res) {
	//Sends() is used be response to send something back to the client
	res.send('This is sent to the client.');
});

//Listen on port 3000, write to console when the connection is opened
app.listen(3000, function() {
	console.log("Running on port 3000.");
});

/* 
What this code does:

1.) We are importing and instantiating the express module, which handles
	a lot of the low-level work for us

2.) We are listening on a port, and providing a callback function to run
	when a connection is started

3.) We are sending back a response to the client when the client goes to the
	page

How to run this:

1.) For this specific file, type node basic_express.js into command line. You
	may have to install dependencies if the current directory does not already
	have a node_modules folder.

2.) The console.log inside the listen() callback function should appear on the
	command line, indicating a connection has been started.

3.) Going to localhost:3000/ in the browser, you should see the response message
	that has been sent and loaded to the browser.