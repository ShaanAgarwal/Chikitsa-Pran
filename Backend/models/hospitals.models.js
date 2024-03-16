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
    password: {
        type: String,
        required: true,
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
        }
    }],
    operationTheatres: [{
        name: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
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
    }],
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;