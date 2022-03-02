/** Express router providing user related routes
 * @module routes/api/courses
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const withAuth = require('../../middleware/token_auth');
const fetch = require('node-fetch');

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
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  console.log('Searching for a subject w/ specific ID');
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
router.get('/subject/:subject_id', (req, res) => {
  console.log('Searching for subjects w/ specific ID');
  Course.find({ subject: { $regex: req.params.subject_id, $options: 'i' } })
    .sort({ name: 1 })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name get/api/courses/tutor/:tutorid
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {string} tutorid - Express path
 */
// GET /api/courses/tutor/tutorid
// Get all courses by a specific tutor ID
router.get('/tutor/:tutor_id', (req, res) => {
  console.log('Searching for courses by a specific tutor ID');
  Course.find({ tutors: req.params.tutor_id })
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
router.post('/', withAuth, (req, res) => {
  const newCourse = new Course({
    id: req.body.course_id,
    subject: req.body.subject,
    name: req.body.name,
  });

  newCourse.save().then((course) => res.json(course));
});

/**
 * Route serving courses form.
 * @name post/api/courses/:id/add-tutor
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {string} id - Express path
 * @param {callback} withAuth - Express middleware
 */
// POST api/courses/:id/add_tutor
// Add tutor to an existing Course object
// If tutor already exists, nothing is added
router.post('/:id/add-tutor', withAuth, (req, res) => {
  Course.updateOne(
    { _id: req.params.id },
    { $addToSet: { tutors: req.body.tutor_id } }
  )
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

/**
 * Route serving courses form.
 * @name post/api/courses/orca-import
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 */
// Add all courses and subjects for currently active semesters
// Data is received through the orca API
if (process.env.NODE_ENV !== 'production') {
  router.post('/orca-import', async (req, res) => {
    const semestersInfo = await fetch(
      'https://rcos-orca.herokuapp.com/semesters'
    ).then((res) => res.json());

    const semesters = semestersInfo.map((semester) => semester.semester_id);
    const subjectRequests = semesters.map((semester) =>
      fetch(`https://rcos-orca.herokuapp.com/${semester}/courses/subjects`)
    );

    const subjectRequestsPreJSON = await Promise.all(subjectRequests);
    const subjectRequestsJSON = await Promise.all(
      subjectRequestsPreJSON.map((subject) => subject.json())
    );
    const subjects = [...new Set(subjectRequestsJSON.flat(1))];
    let subjectCount = 0;
    await Promise.all(
      subjects.map(async (subject) => {
        const found = await Subject.findOne({ id: subject });
        if (found) {
          return;
        }

        const newSubject = new Subject({
          id: subject,
        });

        ++subjectCount;
        await newSubject.save();
      })
    );

    let courseCount = 0;
    await Promise.all(
      semesters.map(async (semester) => {
        for (let offset = 0; true; offset += 50) {
          const data = await fetch(
            `https://rcos-orca.herokuapp.com/${semester}/courses?include_sections=false&include_periods=false&limit=50&offset=${offset}`
          ).then((res) => res.json());

          await Promise.all(
            data.map(async (course) => {
              const found = await Course.findOne({
                id: `${course.subject_prefix} ${course.number}`,
              });

              if (found) {
                return null;
              }

              const newCourse = new Course({
                id: `${course.subject_prefix} ${course.number}`,
                subject: course.subject_prefix,
                name: course.title,
              });

              ++courseCount;
              await newCourse.save();
            })
          );

          if (data.length < 50) {
            break;
          }
        }
      })
    );

    return res.json({
      courses: `${courseCount} courses added`,
      subjects: `${subjectCount} subjects added`,
    });
  });
}

/**
 * Route serving courses form.
 * @name post/api/courses/:id/remove-tutor
 * @function
 * @memberof module:routes/api/courses~coursesRouter
 * @inner
 * @param {string} id - Express path
 * @param {callback} withAuth - Express middleware
 */
// POST api/courses/:id/remove_tutor
// Remove tutor from an existing Course object
router.post('/:id/remove-tutor', withAuth, (req, res) => {
  Course.updateOne(
    { _id: req.params.id },
    { $pull: { tutors: req.body.tutor_id } }
  )
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
