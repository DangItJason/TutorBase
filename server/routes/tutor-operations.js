const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Course = require('../models/Course');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

mongoose.set('useFindAndModify', false);

// GET tutor-operations/price
// Get a tutor's price
router.get('/price/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.price))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/price
// Update an existing tutor's price
router.put('/price', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { $set: { "tutor.price": req.body.price } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/courses
// Get a tutor's courses
router.get('/courses/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.courses))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/courses
// Update an existing tutor's courses
router.put('/courses', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { $set: { "tutor.courses": req.body.courses } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/schedule
// Get a tutor's schedule
router.get('/schedule', (req, res) => {
    User.find({ email: req.body.email })
        .then(users => {
            res.json(users[0].tutor.times)
        }
        )
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/schedule
// Update an existing tutor's schedule
router.put('/schedule', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { $set: { "tutor.times": req.body.times } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/interval
// Get a tutor's meeting interval
router.get('/interval', (req, res) => {
    User.find({ email: req.body.email })
        .then(users => res.json(users[0].tutor.interval))
        .catch(err => res.status(400).json({ msg: err.message }))
});

// PUT tutor-operations/interval
// Update an existing tutor's meeting interval
router.put('/interval', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { $set: { "tutor.interval": req.body.interval } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

module.exports = router;