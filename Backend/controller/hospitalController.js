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
const addMedicalEquipment = async (req, res) => {
    try {
        const { hospitalId, name, count } = req.body;
        
        if (!hospitalId || !name || !count || count < 1) {
            return res.status(400).json({ message: 'Please provide hospitalId, name, and a valid count for medical equipment.' });
        }


        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }

        const existingEquipment = hospital.medicalEquipment.find(equipment => equipment.name === name);
        if (existingEquipment) {
            return res.status(400).json({ message: 'Medical equipment already exists for this hospital.' });
        }

        hospital.medicalEquipment.push({ name, count });

        await hospital.save();

        res.status(201).json({ message: 'Medical equipment added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const createOperationTheatre = async (req, res) => {
    try {
        const { name, count } = req.body;
        const hospitalId = req.params.hospitalId;
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        };
        const existingOperationTheatre = hospital.operationTheatres.find(theatre => theatre.name === name);
        if (existingOperationTheatre) {
            return res.status(400).json({ message: 'Operation theatre with this name already exists.' });
        };
        hospital.operationTheatres.push({ name, count });
        await hospital.save();
        res.status(201).json({ message: 'Operation theatre created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = { registerHospital, createOperationTheatre, addMedicalEquipment };
