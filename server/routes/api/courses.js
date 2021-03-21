const express = require("express");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");

const router = express.Router();

// GET /api/courses
// Get all courses
router.get("/", (req, res) => {
    Course.find()
        .sort({ name: 1 })
        .then((courses) => res.json(courses))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/courses/subject_id
// Get all courses with a specific subject ID
router.get("/:subject_id", (req, res) => {
    console.log("Fetching all courses based of subject id!");
    Course.find({ id: { $regex: req.params.subject_id, $options: "i" } })
        .sort({ name: 1 })
        .then((courses) => res.json(courses))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/courses
// Create a new Course object
router.post("/", (req, res) => {
    const newCourse = new Course({
        id: req.body.course_id,
        name: req.body.name,
    });
    newCourse.save().then((course) => res.json(course));
});

// POST api/course/add_tutor
// Add tutor to an existing Course object
// If tutor already exists, nothing is added
router.post("/course/add-tutor", (req, res) => {
    Course.updateOne(
        { name: req.body.course_name },
        { $addToSet: { tutors: req.body.tutor_id } }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/catalog/course/remove_tutor
// Remove tutor from an existing Course object
router.post("/course/remove-tutor", (req, res) => {
    Course.updateOne(
        { name: req.body.course_name },
        { $pull: { tutors: req.body.tutor_id } }
    )
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET api/courses/course_id
// Get course with a specific course id
// router.get("/:course_id", (req, res) => {
//     console.log("Fetching course based off course id!", req.body.course_id);
//     Course.find({ id: req.body.course_id })
//         .then((course) => res.json(course))
//         .catch((err) => res.status(400).json({ msg: err.message }));
// });

module.exports = router;
