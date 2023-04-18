const express = require('express')
const app = express()
const router = express.Router()
const form = require('../model/form')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/', async (req, res) => {
    try {
        const data = await form.find();
        res.status(200).json({
            data
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in fetching forms"
        })
    }
})

router.post('/upload', async (req, res) => {
    const file = req.files.image;

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        let obj = {
            name: req.body.name,
            email: req.body.email,
            image: result.url
        }
        let data = new form(obj);
        await data.save();
        res.status(200).json({
            message: "Form submitted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error in submitting form"
        })
    }
})

module.exports = router;
