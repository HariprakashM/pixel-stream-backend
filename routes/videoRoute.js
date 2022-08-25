const express = require('express');
const video = express.Router();
const checkAuth = require('../middlewares/check-auth')
const Video = require('../models/video')
const thumbnailGenerator = require('../asserts/videothumbnails')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'media/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100
  }
});

video.post('/', checkAuth, upload.single('file'), (req, res, next) => {
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    'http://localhost:5000' + '/api/videos/' + req.file.filename.replace(/ /g, '_'),
    req.file.filename.replace(/ /g, '_'),
    req.username);
  res.status(200).json({
    message: 'Video upload successful'
  });
});


video.get('/videolist', async (req, res) => {
  try {
    const videodata = await Video.find();
    res.send(videodata);
  } catch (error) {
    return res.status(400).json({ error });
  }
})


video.post('/:title', async (req, res) => {
  try {
    const videodata = await Video.find({ upload_title: req.params.title });
    res.send(videodata);

  } catch (error) {
    return res.status(400).json({ message: "unable to view the video" });
  }
})

video.delete("/deletevideo/:id", async function (req, res) {

  try {
    const result = await Video.deleteOne({ _id: req.params.id });
    res.json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
})

video.get("/editvideo/:id", async function (req, res) {
  try {

    const result = await Video.findOne({ _id: req.params.id });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
})

video.put("/editedvideo/:id", async function (req, res) {

  try {
    const result = await Video.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
})


module.exports = video;