//This file is an example of a Model

var mongoose = require('mongoose');
//The schema is just like how we would define an object
var Schema = mongoose.Schema;

//Define a schema, just like a constructor for an object
//Field:value syntax, just like JSON (except the value is a type)
var user = new Schema({
	userName: String,
	Password: String,
	GraduationYear: Number
	//Can give a default value
	Major: {type: String, default: "Undeclared"}
});

//Allows this schema to be exported to other files
//The first argument is the name of the collection to be created
//The second argument is the schema used for the collection
module.exports = mongoose.model('User', user);