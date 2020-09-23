//This file is an example of a Model

var mongoose = require('mongoose');
//The schema is just like how we would define an object
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Define a schema, just like a constructor for an object
//Field:value syntax, just like JSON (except the value is a type)
var group = new Schema({
	groupName: String,
	groupPassword: String,
	groupGraduationYear: Number
	//Can give a default value
	groupMajor: {type: String, default: "Undeclared"}
	//We are storing objectIDs of documents who follow the 'User' schema
	members: [{type: ObjectId, ref:'User'}]
});

//Allows this schema to be exported to other files
//The first argument is the name of the collection to be created
//The second argument is the schema used for the collection
module.exports = mongoose.model('Group', group);