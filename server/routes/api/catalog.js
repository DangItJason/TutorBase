const express = require('express');
var router = express.Router();
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');

// GET api/catalog
// Get all subjects
router.get('/', (req, res) => {
    try {
        Subject.find().sort({name: 1}).then(subjects => res.json(subjects));
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// GET api/catalog/:course_id
// Get course with a specific course_id
router.get('/:course_id', (req, res) => {
    Course.find({id: req.params.course_id})
        .then(course => res.json(course))
        .catch(err => res.status(404).json({success: false}));
});

// POST api/catalog
// Create a new Subject object
router.post('/', (req, res) => {
    const newSubject = new Subject({
        id: req.body.subject_id
    });

    newSubject.save().then(subject => res.json(subject));
});

module.exports = router;