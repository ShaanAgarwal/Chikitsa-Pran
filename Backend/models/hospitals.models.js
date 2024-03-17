const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
        default: 'https://www.shutterstock.com/shutterstock/photos/212251981/display_1500/stock-photo-modern-hospital-style-building-212251981.jpg'
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        default: 1023456789,
    },
    ambulancePhoneNumber: {
        type: Number,
        required: true,
        default: 2839288938
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    rejectionCount: {
        type: Number,
        default: 0
    },
    medicalEquipment: [{
        name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        threshold: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true,
            default: 'image-url.png'
        },
    }],
    operationTheatres: [{
        name: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        threshold: {
            type: Number,
            required: true
        }
    }],
    doctors: [{
        speciality: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        threshold: {
            type: Number,
            required: true
        }
    }],
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
