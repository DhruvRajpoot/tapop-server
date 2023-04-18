const express = require('express')
const app = express()
require('dotenv').config()  //env
const cors=require('cors')  //cors
const connectToMongo = require('./db')
connectToMongo()    //connect to database
const port = process.env.PORT || 10000

app.use(cors()) //cors

app.use('/public',express.static('public'))   //static files

app.use('/form', require('./routes/formsubmit'))

app.listen(port, () => {
    console.log('server is running on port ', port);
})