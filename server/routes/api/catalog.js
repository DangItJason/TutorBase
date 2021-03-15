const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");

// GET api/catalog
// Get all subjects
router.get("/", (req, res) => {
  console.log("Searching for all subject codes");
  Subject.find()
    .sort({ name: 1 })
    .then((subjects) => res.json(subjects))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/courses
// Get all courses
router.get("/courses", (req, res) => {
  Course.find()
    .sort({ name: 1 })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET /api/catalog/courses/subject_id
// Get all courses with a specific subject ID
router.get("/courses/:subject_id", (req, res) => {
  Course.find({ id: { $regex: req.params.subject_id, $options: "i" } })
    .sort({ name: 1 })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// GET api/catalog/course
// Get course with a specific course id
router.get("/course", (req, res) => {
  Course.find({ id: req.body.course_id })
    .then((course) => res.json(course))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/catalog
// Create a new Subject object
router.post("/", (req, res) => {
  const newSubject = new Subject({
    id: req.body.subject_id,
  });
  newSubject.save().then((subject) => res.json(subject));
});

// POST api/catalog/update
// Update an existing Subject object with a new course
router.post("/update", (req, res) => {
  Subject.updateOne(
    { id: req.body.subject_id },
    { $push: { courses: req.body.course_id } }
  )
    .then((subject) => res.json(subject))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/catalog/course
// Create a new Course object
router.post("/course", (req, res) => {
  const newCourse = new Course({
    id: req.body.course_id,
    name: req.body.name,
  });
  newCourse.save().then((course) => res.json(course));
});

// POST api/catalog/course/add_tutor
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

// POST api/catalog/tutors
// Get tutors (Users) from a list of Object IDs
router.post("/tutors", (req, res) => {
  User.find({ _id: { $in: req.body.tutor_ids } }, "-password -client", {
    lean: true,
  })
    .sort({ first_name: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ msg: err.message }));
});

// POST api/catalog/appointment
// Create a new Appointment
router.post("/appointment", (req, res) => {
  // let newAppt = new Appointment({
  //   appt_id: new mongoose.mongo.ObjectId(),
  //   course_id: req.body.course_id,
  //   date: new Date(req.body.date),
  //   start_time: req.body.start,
  //   end_time: req.body.end,
  //   location: req.body.loc,
  //   tutor_id: req.body.tutor_id,
  //   client_id: req.body.client_id,
  //   price: req.body.price,
  //   notes: req.body.notes,
  // });
  let newAppt = new Appointment({
    appt_id: new mongoose.mongo.ObjectId(),
    course_id: req.body.course_id,
    start_time: req.body.date ? req.body.date : new Date(),
    duration: parseInt(req.body.end),
    location: req.body.loc ? req.body.loc : "test",
    tutor_id: req.body.tutor_id,
    client_id: req.body.client_id,
    price: req.body.price,
    notes: req.body.notes,
  });
  newAppt.save();

  console.log("DEBUG: Printing newAppt =>", newAppt);

  // TODO: Check that both object ids exist before pushing appointment

  // Add appointment to client
  try {
    User.updateOne(
      { _id: req.body.client_id },
      { $push: { client: { appts: newAppt } } }
    );
    User.save();
  } catch (e) {
    print(e)
  }

  // User.updateOne(
  //   { _id: req.body.client_id },
  //   { $push: { client: { appts: newAppt } } }
  // ).catch((err) => res.status(400).json({ msg: err.message }));

  console.log("DEBUG: ADDED APPOINTMENT TO CLIENT!");

  // Add appointment to tutor
  try {
    User.updateOne(
      { _id: req.body.tutor_id },
      { $push: { client: { appts: newAppt } } }
    );
    User.save();
  } catch (e) {
    print(e)
  }
  // User.updateOne(
  //   { _id: req.body.tutor_id },
  //   { $push: { tutor: { appts: newAppt } } }
  // ).catch((err) => res.status(400).json({ msg: err.message }));

  console.log("DEBUG: ADDED APPOINTMENT TO TUTOR!");

  res.json(newAppt);
});

module.exports = router;
