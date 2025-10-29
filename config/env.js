require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('@@@@@@@@@@@@@@ -> Db ok')
    } catch (error) {
        console.log('@@@@@@@@@@@@@@ -> Db nooook!!!', error)
    }
};

module.exports = connectDB;