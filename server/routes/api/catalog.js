const express = require('express');
var router = express.Router();
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');

// GET api/catalog
// Get all subjects
router.get('/', (req, res) => {
    Subject.find().sort({name: 1})
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/courses
// Get all courses
router.get('/courses', (req, res) => {
    Course.find().sort({name: 1})
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/course
// Get course with a specific course id
router.get('/course', (req, res) => {
    Course.find({id: req.body.course_id})
        .then(course => res.json(course))
        .catch(err => res.status(400).json({ msg: err.message }));
});

// POST api/catalog
// Create a new Subject object
router.post('/', (req, res) => {
    const newSubject = new Subject({
        id: req.body.subject_id
    });
    newSubject.save().then(subject => res.json(subject));
});

// POST api/catalog/update
// Update an existing Subject object with a new course
router.post('/update', (req, res) => {
    Subject.updateOne({id: req.body.subject_id}, {$push: {courses: req.body.course_id}})
        .then(subject => res.json(subject))
        .catch(err => res.status(400).json({ msg: err.message}));
});

// POST api/catalog/course
// Create a new Course object
router.post('/course', (req, res) => {
    const newCourse = new Course({
        id: req.body.course_id,
        name: req.body.name
    });
    newCourse.save().then(course => res.json(course));
});

// POST api/catalog/course/update
// Update an existing Course object with a new tutor
router.post('/course/update', (req, res) => {
    Course.updateOne({id: req.body.course_id}, {$push: {tutors: req.body.tutor_id}})
        .then(course => res.json(course))
        .catch(err => res.status(400).json({ msg: err.message}));
});

module.exports = router;