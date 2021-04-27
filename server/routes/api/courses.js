/** Express router providing user related routes
 * @module routes/api/courses
 * @requires express
 */

const express = require("express");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const withAuth = require("../../middleware/token_auth");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace coursesRouter
 */
const router = express.Router();

/**
 * Route serving courses form.
 * @name get/api/courses
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 */
// GET /api/courses
// Get all courses
router.get("/", (req, res) => {
    Course.find()
        .sort({ name: 1 })
        .then((courses) => res.json(courses))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name get/api/courses/:id
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {string} id - Express path
 */
// GET api/courses/:id
// Get course with a specific course id
router.get("/:id", (req, res) => {
    console.log("Searching for a subject w/ specific ID");
    Course.find({ _id: req.params.id })
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name get/api/courses/subject/:subjectid
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {string} subjectid - Express path
 */
// GET /api/courses/subject/subject_id
// Get all courses with a specific subject ID
router.get("/subject/:subject_id", (req, res) => {
    console.log("Searching for subjects w/ specific ID");
    Course.find({ subject: { $regex: req.params.subject_id, $options: "i" } })
        .sort({ name: 1 })
        .then((courses) => res.json(courses))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name post/api/courses
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {callback} withAuth - Express middleware
 */
// POST api/courses
// Create a new Course object
router.post("/", withAuth, (req, res) => {
    const newCourse = new Course({
        id: req.body.course_id,
        subject: req.body.subject,
        name: req.body.name,
    });

    newCourse.save().then((course) => res.json(course));
});

// POST api/courses/:id/add_tutor
// Add tutor to an existing Course object
// If tutor already exists, nothing is added
router.post("/:id/add-tutor", withAuth, (req, res) => {
    Course.updateOne(
        { _id: req.params.id },
        { $addToSet: { tutors: req.body.tutor_id } }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/courses/:id/remove_tutor
// Remove tutor from an existing Course object
router.post("/:id/remove-tutor", withAuth, (req, res) => {
    Course.updateOne(
        { _id: req.params.id },
        { $pull: { tutors: req.body.tutor_id } }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
