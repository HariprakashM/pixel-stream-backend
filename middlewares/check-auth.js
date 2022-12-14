const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET = process.env.SECRET;
const User = require('../models/user');


const authenticate = async function (req, res, next) {
    if (req.headers.authorization) {
        console.log(req.headers.authorization)
        let verify = jwt.verify(req.headers.authorization, SECRET);
        const temp = await User.findOne({ _id: verify._id })
        if (temp) {
            // console.log(verify)
            // console.log(temp)
             next()
        } else {
            res.status(401).json({ message: "unauthorized" });
        }

    } else {
        res.status(401).json({ message: "invalid token" });
    }


}

module.exports = authenticate