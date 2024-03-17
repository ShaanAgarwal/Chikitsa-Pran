const mongoose = require('mongoose');

const rejectionSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    disease: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

module.exports = mongoose.model('Rejection', rejectionSchema);