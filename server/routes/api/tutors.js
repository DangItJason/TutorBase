/** Express router providing user related routes
 * @module routes/api/tutors
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
 * @namespace tutorRouter
 */
let router = express.Router();

//Email notify admins of new tutor signup applications
var emailsender = require("../../lib/emailsender.js");

//dev mode
const developer = process.env.NODE_ENV !== 'production';

//Models
const mongoose = require('mongoose');
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const Appointment = require('../../models/Appointment');
const Tutor = require('../../models/Tutor');
const TutorApplication = require('../../models/TutorApplication');

// Middleware
const withAuth = require('../../middleware/token_auth')
const jwt = require('jsonwebtoken');
const parseCookies = require("../../lib/parseCookies");
const secret = require("../../config/secret");
const passport = require('passport');

//mongoose.set('useFindAndModify', false);

/**
 * Route serving tutor actions.
 * @name get/api/tutors
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// GET /api/tutors
// Get all tutors
router.get("/", withAuth, (req, res) => {
    console.log("wev")
    Tutor.find()
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving tutor actions.
 * @name get/api/tutors
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// GET /api/tutors/tutor
// Get tutor by id
router.get("/tutor/:tutor_id", (req, res) => {
    console.log("Searching forn tutor by ID");
    Tutor.find({ _id: req.params.tutor_id })
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving tutor actions.
 * @name get/api/tutors
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// GET /api/tutors?email=test@test.com
// Get tutor by email
router.get("/", (req, res) => {
    Tutor.find({ email: req.query.email })
        .sort({ name: 1 })
        .then((tutors) => res.json(tutors))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving tutor actions.
 * @name post/api/tutors
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// POST /api/tutors
// Create a tutor
router.post("/", withAuth, (req, res) => {
    const newTutor = new Tutor({
        userId: req.body.userId,
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

/**
 * Route serving tutor actions.
 * @name put/api/tutors/tutor
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// PUT /api/tutors/tutor
// Update a tutor
router.put("/tutor", withAuth, (req, res) => {

    const token = parseCookies(req.headers.cookie).token

    //protect route
    if(!!!developer){
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
        
                res.status(401).send('Unauthorized: Invalid token');
            } else if (req.body.userid !== decoded.userid) {
                res.status(403).send(`Forbidden: Access denied ${req.body.userid} ${decoded.userid}`);
            
            } else{
                true;
            }});
    }
      
    const entries = Object.keys(req.body)
    const updates = {}

    for (let i = 0; i < entries.length; i++){
        updates[entries[i]] = Object.values(req.body)[i]
    }

    Tutor.findOneAndUpdate(
        { _id: req.body.userid },
        updates 
    )
        .then((tutor) => res.json(tutor))
        .catch((err) => res.status(400).json({ msg: err.message }));
});


/**
 * Route serving tutor actions.
 * @name delete/api/tutors/tutor
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// DELETE /api/tutors/tutor
// Update a tutor
router.delete("/:tutor_id", withAuth, (req, res) => {

    const token = parseCookies(req.headers.cookie).token

    //protect route
    if(!!!developer){
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
        
                res.status(401).send('Unauthorized: Invalid token');
            } else if (req.body.userid !== decoded.userid) {
                res.status(403).send('Forbidden: Access denied');
            
            } else{
                true;
            }});
    }

    Tutor.deleteOne(
        { _id: req.params.tutor_id }
    )
        .then((tutor) => res.json(tutor))
        .catch((err) => res.status(400).json({ msg: err.message }));
});


/**
 * Route serving tutor applications.
 * @name post/api/tutors/apply
 * @function
 * @memberof module:routes/api/tutors~tutorRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// POST /api/tutors
// Create a tutor
router.post("/apply", withAuth, (req, res) => {
    const newTutorApplication = new TutorApplication({
        userId: req.body.userId,
        rin: req.body.rin,
        subjects: req.body.subjects,
        comments: req.body.comments,
        rate: req.body.rate,
        paypal_email: req.body.paypal_email
    });
    newTutorApplication.save().then((app) => {
        var htmlOrig = fs.readFileSync(__dirname + '../../lib/email_tutor_application.html').toString();

        var html = htmlOrig.replace("{{user-id}}", req.body.userId)
                    .replace("{{rin}}", req.body.rin)
                    .replace("{{subjects}}", req.body.subjects)
                    .replace("{{comments}}", req.body.comments)
                    .replace("{{rate}}", req.body.rate)
                    .replace("{{paypal-email}}", req.body.paypal_email)
                    ;
        var emailresult = emailsender.send("tutorbaseadmin@gmail.com", html, "NEW TUTOR APPLICATION: " + req.body.rin);
        res.json(app);
    });
});


module.exports = router;
