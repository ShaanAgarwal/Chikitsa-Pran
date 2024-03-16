const express = require('express');
const Hospital = require('../models/hospitals.models');

const registerHospital = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        if (!name || !email || !password || !location || !location.latitude || !location.longitude) {
            return res.status(400).json({ message: 'Please provide name, email, password, and location.' });
        }
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({ message: 'Hospital with this email already exists.' });
        }
        const hospital = new Hospital({
            name,
            email,
            password,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
        await hospital.save();
        res.status(201).json({ message: 'Hospital registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    };
};

module.exports = { registerHospital };