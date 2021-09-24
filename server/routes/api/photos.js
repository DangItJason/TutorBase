const express = require('express');
const multer = require('multer');
const Tutor = require("../../models/Tutor");
const Router = express.Router();

const upload = multer({
    limits: {
      fileSize: 1000000 // max file size 1MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
        cb(new Error('only upload files with jpg or jpeg format.'));
      }
      cb(undefined, true); // continue with upload
    }
  });

  Router.post(
    '/photos',
    upload.single('photo'),
    async (req, res) => {
      try {

        const file = req.file.buffer;
        Tutor.update(
            { _id: req.params.userid },
            { $set: {photo: file} }
        )
        .then((tutor) => res.json(tutor))
        .catch((err) => res.status(400).json({ msg: err.message }));

  
        await Tutor.save();
        res.status(201).send({ _id: photo._id });
      } catch (error) {
        res.status(500).send({
          upload_error: 'Error while uploading file.'
        });
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send({
          upload_error: error.message
        });
      }
    }
  );
  
  Router.get('/photos', async (req, res) => {
    try {
      const tutor = await Tutor.find({_id: req.params.tutor_id});
      res.send(tutor.photo);
    } catch (error) {
      res.status(500).send({ get_error: 'Error while getting tutor photo.' });
    }
  });
