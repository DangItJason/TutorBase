/** Express router providing user related routes
 * @module routes/tutor-operations
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
var router = express.Router();

//Models
const mongoose = require('mongoose');
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');

mongoose.set('useFindAndModify', false);

// GET tutor-operations/price
// Get a tutor's price
/**
 * Route serving tutor-operations
 * @name get/price/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/price/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.price))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/price
// Update an existing tutor's price
/**
 * Route serving tutor-operations
 * @name put/price
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
/**
 * Route serving tutor-operations
 * @name get/courses/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/courses/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.courses))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/courses
// Update an existing tutor's courses
/**
 * Route serving tutor-operations
 * @name put/courses
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
/**
 * Route serving tutor-operations
 * @name get/schedule/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/schedule/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.times))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/schedule
// Update an existing tutor's schedule
/**
 * Route serving tutor-operations
 * @name get/schedule/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
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
/**
 * Route serving tutor-operations
 * @name get/interval/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/interval/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.interval))
        .catch(err => res.status(400).json({ msg: err.message }))
});

// PUT tutor-operations/interval
// Update an existing tutor's meeting interval
/**
 * Route serving tutor-operations
 * @name put/interval
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/interval', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, { $set: { "tutor.interval": req.body.interval } })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/name
// Get a users Name
/**
 * Route serving tutor-operations
 * @name get/name/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/name/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json({
            first_name: users[0].first_name,
            last_name: users[0].last_name
        }))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/name
// Update an existing users first and last name
/**
 * Route serving tutor-operations
 * @name put/name
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/name', async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name
            }
        })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/description
// Get a tutor's description
/**
 * Route serving tutor-operations
 * @name get/description/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/description/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json({ description: users[0].tutor.description }))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// PUT tutor-operations/description
// Update an existing tutor's description
/**
 * Route serving tutor-operations
 * @name put/description
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/description', async (req, res) => {
    try {
        console.log(req.body.description)
        await User.findOneAndUpdate({ email: req.body.email }, {
            $set: {
                "tutor.description": req.body.description
            }
        })
        res.send(true)
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// GET tutor-operations/pfp
// Get a tutor's profile picture
/**
 * Route serving tutor-operations
 * @name get/pfp/:email
 * @function
 * @memberof module:routes/tutor-operations~tutorOperationsRouter
 * @requires module:routes/tutor-operations~userEmail
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/pfp/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then(users => res.json(users[0].tutor.profile_img))
        .catch(err => res.status(400).json({ msg: err.message }));
});

module.exports = router;
