/** Express router providing user related routes
 * @module routes/tutors
 * @requires express
 */


/**
* express module
* @const
*/
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace tutorOperationsRouter
 */
let router = express.Router();

//Models
const mongoose = require('mongoose');
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const Appointment = require('../../models/Appointment');
const Tutor = require('../../models/Tutor');

// Middleware
const withAuth = require('../../middleware/token_auth')

mongoose.set('useFindAndModify', false);

// GET /api/tutors
// Get all tutors
router.get("/", withAuth, (req, res) => {
    Tutor.find()
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/tutors/tutor
// Get tutor by id
router.get("/tutor", withAuth, (req, res) => {
    Tutor.find({ _id: req.userid })
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/tutors?email=test@test.com
// Get tutor by email
router.get("/", (req, res) => {
    Tutor.find({ email: req.query.email })
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST /api/tutors
// Create a tutor
router.post("/", withAuth, (req, res) => {
    const newTutor = new Tutor({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,

        // Time they can tutor
        // times: req.body.times,

        // price: {type: Number, default: 30},
        // interval: {type: Number, default: 30},
    });

    newTutor.save().then((course) => res.json(course));
});

// PUT /api/tutors/tutor
// Update a tutor
router.put("/tutor", withAuth, (req, res) => {
    const entries = Object.keys(req.body)
    const updates = {}

    for (let i = 0; i < entries.length; i++)
        updates[entries[i]] = Object.values(req.body)[i]

    Tutor.update(
        { _id: req.userid },
        { $set: updates }
    )
        .then((tutor) => res.json(tutor))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
