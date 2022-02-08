/** Express router providing user related routes
 * @module routes/api/subjects
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const withAuth = require("../../middleware/token_auth");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace subjectsRouter
 */
const router = express.Router();


/**
 * Route serving subjects form.
 * @name get/api/subjects
 * @function
 * @memberof module:routes/api/subjects~subjectsRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// GET /api/subjects
// Get all subjects
router.get("/", (req, res) => {
    Subject.find()
        .sort({ name: 1 })
        .then((subjects) => res.json(subjects))
        .catch((err) => res.status(400).json({ msg: err.message }));
});


/**
 * Route serving subjects form.
 * @name post/api/subjects
 * @function
 * @memberof module:routes/api/subjects~subjectsRouter
 * @inner
 * @param {callback} withAuth - Express middleware.
 */
// POST api/subjects
// Create a new Subject object
router.post("/", withAuth, (req, res) => {
    const newSubject = new Subject({
        id: req.body.subject_id,
    });
    newSubject.save().then((subject) => res.json(subject));
});


module.exports = router;
