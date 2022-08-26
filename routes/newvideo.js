const express = require('express');
const video = express.Router();
const Formvideo = require('../models/newvideo')
const Auth=require('../middlewares/check-auth')

video.post('/addvideo',Auth, async (req, res) => {

    const { title,
        movie,
        cast,
        catagory,
        thumbnail_img,
        video_link,
        uploader_name } = req.body;

    console.log(req.body)

    const videodata = new Formvideo({
        title,
        movie,
        cast,
        catagory,
        thumbnail_img,
        video_link,
        uploader_name
    })
    console.log(videodata)
    try {
        await videodata.save();
        res.json({ message: "success" })
    } catch (error) {
        return res.status(400).json({ error });
    }
})

video.get('/videolist', async (req, res) => {
    try {
        const videodata = await Formvideo.find();
        res.send(videodata);
    } catch (error) {
        return res.status(400).json({ error });
    }
})

video.post('/:id', async (req, res) => {
    try {
        const videodata = await Formvideo.find({ _id: req.params.id });
        res.send(videodata);

    } catch (error) {
        return res.status(400).json({ message: "unable to view the video" });
    }
})

video.delete("/deletevideo/:id", async function (req, res) {

    try {
        const result = await Formvideo.deleteOne({ _id: req.params.id });
        res.json({ message: "updated successfully" });
    } catch (error) {
        console.log(error);
    }
})

video.get("/editvideo/:id", async function (req, res) {
    try {

        const result = await Formvideo.findOne({ _id: req.params.id });

        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

video.put("/editedvideo/:id", async function (req, res) {

    try {
      const result = await Formvideo.updateOne({ _id: req.params.id }, { $set: req.body });
      res.json({ message: "updated successfully" });
    } catch (error) {
      console.log(error);
    }
  })
module.exports = video;