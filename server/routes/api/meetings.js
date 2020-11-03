const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');

// POST api/catalog/tutors
// Get tutors (Users) from a list of Object IDs
router.post('/tutors', (req, res) => {
    User.find({_id: {"$in": req.body.tutor_ids}}, '-password -client' , {lean: true}).sort({first_name: 1})
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// POST api/meetings/appointments
// Get all appointments from a client id
router.post('/appointments', (req, res) => {
    User.findOne({_id : req.body.user_id}, 'client')
        .then(user => {
            res.json(user.client)
        })
        .catch(err => res.status(400).json({ msg: err.message }));
});

module.exports = router;