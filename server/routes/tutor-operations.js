const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Course = require('../models/Course');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

mongoose.set('useFindAndModify', false);

router.get('/price', (req, res) => {
    User.find({ email: req.body.email }).then(users => res.json(users[0].tutor.price)).catch(err => res.status(400).json({ msg: err.message }));
});

router.put('/price', async (req, res) => {
    try {
        await User.findOneAndUpdate(req.body.user, { tutor: { price: req.body.price } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});


module.exports = router;