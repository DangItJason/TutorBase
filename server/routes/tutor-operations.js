const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Course = require('../models/Course');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.get('/price', (req, res) => {
    User.find({email: req.body.email}).then(users => res.json(users[0].tutor.price)).catch(err => res.status(400).json({ msg: err.message }));
});



module.exports = router;