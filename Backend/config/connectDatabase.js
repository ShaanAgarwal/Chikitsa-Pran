const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://agarwalshaan27:XU8vU1lyTOyo7PhW@cluster0.cojfvih.mongodb.net/chikitsa_pran?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`.bgRed.white);
    }
};

module.exports = connectDB;