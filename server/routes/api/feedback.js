/** Express router providing feedback related routes
 * @module routes/feedback
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
 * @namespace appointmentOperationsRouter
 */
let router = express.Router();

const mongoose = require("mongoose");

const Feedback = require("../../models/Feedback");
const withAuth = require("../../middleware/token_auth");

const { promisify } = require('util')

const randomBytesAsync = promisify(require('crypto').randomBytes)

//mongoose.set('useFindAndModify', false);

// GET /api/feedback
// Get all feedback
router.get("/", (req, res) => {
    // Return all feedbacks in a json object
    // TODO: Better error handling
    Feedback.find()
        .then((feedbacks) => res.json(feedbacks))
        .catch((err) => res.status(500).json({ msg: err.message }));
});

// GET /api/feedback/{tutorId}
// Get all feedback for selected tutor
router.get("/:tutorId", (req, res) => {
    console.log(req);

    // Return all feedbacks in a json object
    // TODO: Better error handling
    Feedback.find({ "tutorId": req.params.tutorId })
        .then((feedbacks) => res.json(feedbacks))
        .catch((err) => res.status(500).json({ msg: err.message }));
});

// POST api/feedback
// Create a new feedback
router.post("/", async (req, res) => {
    let clientId = req.body.clientId;
    let tutorId = req.body.tutorId;
    let message = req.body.message;
    let rating = req.body.rating;

    let newFeedback = new Feedback({
        clientId: clientId,
        tutorId: tutorId,
        message: message,
        rating: rating
    })
    newFeedback.save();
    res.json(newFeedback);
});

module.exports = router;
