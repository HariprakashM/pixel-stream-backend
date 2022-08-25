const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET = process.env.SECRET;

router.post('/register', async (req, res) => {

  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hash;
    const newuser = new User(req.body);
    const user = await newuser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.json({ message: "Registration Failed" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const temp = await User.findOne({ email: req.body.email })
    if (temp) {
      const match = await bcryptjs.compare(req.body.password, temp.password);
      if (match) {
        const token = jwt.sign({ _id: temp._id }, SECRET);
        res.json({ message: "successfully logged in", temp, token })
      } else {
        res.json({ message: "incorrect password" })
      }
    } else { res.json({ message: "user not found,Kindly register before logging in" }) }
  } catch (error) {
    res.status(400).json({ message: "Login Failed" })
  }
});


router.get('/getallusers', async (req, res) => {
  try {
    const userdata = await User.find();
    res.send(userdata);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;