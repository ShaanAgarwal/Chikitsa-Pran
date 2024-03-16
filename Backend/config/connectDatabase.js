const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shaanagarwalofficial:rOFG6oZeRHugwoFP@cluster0.o071o9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`.bgRed.white);
    }
};

module.exports = connectDB;