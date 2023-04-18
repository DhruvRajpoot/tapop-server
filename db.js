const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.DATABASE_URI

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Mongo');
    }
    catch (err) {
        console.log('Error while connnecting to Mongo', err)
    }
}

module.exports = connectToMongo