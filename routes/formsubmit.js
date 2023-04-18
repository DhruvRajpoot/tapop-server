const express = require('express')
const app = express()
const router = express.Router()
const multer = require('multer');
const bodyParser = require('body-parser')
const form = require('../model/form')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

var upload = multer({ storage: storage });

//get form data
router.get('/', async (req, res) => {
    try {
        let data = await form.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Error in getting form data"
        })
    }
})

//upload form data
router.post('/upload', upload.single('image'), async (req, res) => {
    let obj = {
        name: req.body.name,
        email: req.body.email,
        image: req.file.filename
    }
    try {
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
}
)

module.exports = router;