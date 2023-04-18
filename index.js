const express = require('express')
const app = express()
require('dotenv').config()  //env
const port = process.env.PORT || 10000

//connect to database
const connectToMongo = require('./db')
connectToMongo()    

 //cors
const cors=require('cors') 
app.use(cors({
    origin: '*',
})) 

//file upload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true
}))   

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/form', require('./routes/formsubmit'))

app.listen(port, () => {
    console.log('server is running on port ', port);
})