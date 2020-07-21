const express = require('express');
var router = express.Router();
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');

// GET api/catalog
// Get all subjects
router.get('/', (req, res) => {
    Subject.find()
        .sort({name: 1})
        .then(subjects => res.json(subjects));
});

// GET api/catalog/:course_id
// Get course with a specific course_id
router.get('/:course_id', (req, res) => {
    Course.find({id: req.params.course_id})
        .then(course => res.json(course))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;