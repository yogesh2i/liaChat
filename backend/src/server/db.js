const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log("Connected to db");
    } catch (error) {
        console.log("Failed to connect db");
        process.exit(1);
    }
}

module.exports = connectToDatabase;