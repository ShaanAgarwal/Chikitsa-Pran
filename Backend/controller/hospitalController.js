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
        };
        const existingEquipment = hospital.medicalEquipment.find(equipment => equipment.name === name);
        if (existingEquipment) {
            return res.status(400).json({ message: 'Medical equipment already exists for this hospital.' });
        };
        hospital.medicalEquipment.push({ name, count });
        await hospital.save();
        res.status(201).json({ message: 'Medical equipment added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
const Hospital = require('../models/Hospital');

const updateMedicalEquipment = async (req, res) => {
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
        if (!existingEquipment) {
            return res.status(404).json({ message: 'Medical equipment not found in the hospital.' });
        }

        existingEquipment.count = count;
        await hospital.save();

        res.status(200).json({ message: 'Medical equipment count updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = updateMedicalEquipment;


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
const Hospital = require('../models/Hospital');

const updateOperationTheatre = async (req, res) => {
    try {
        const { name, count } = req.body;
        const hospitalId = req.params.hospitalId;
        if (!hospitalId || !name || !count) {
            return res.status(400).json({ message: 'Please provide hospitalId, name, and count for the operation theatre.' });
        }
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }
        const existingOperationTheatre = hospital.operationTheatres.find(theatre => theatre.name === name);
        if (!existingOperationTheatre) {
            return res.status(404).json({ message: 'Operation theatre not found in the hospital.' });
        }
        existingOperationTheatre.count = count;
        await hospital.save();
        res.status(200).json({ message: 'Operation theatre count updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
module.exports = updateOperationTheatre;

const Hospital = require('../models/Hospital');

const createDoctor = async (req, res) => {
    try {
        const { hospitalId, speciality, count } = req.body;

        if (!hospitalId || !speciality || !count) {
            return res.status(400).json({ message: 'Please provide hospitalId, speciality, and count for the doctor.' });
        };

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        };

        hospital.doctors.push({ speciality, count });
        await hospital.save();

        res.status(201).json({ message: 'Doctor added to the hospital successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
const updateDoctor = async (req, res) => {
    try {
        const { hospitalId, speciality, count } = req.body;

        if (!hospitalId || !speciality || !count) {
            return res.status(400).json({ message: 'Please provide hospitalId, speciality, and count for the doctor.' });
        }

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        }
        let doctorToUpdate = hospital.doctors.find(doc => doc.speciality === speciality);

        if (!doctorToUpdate) {
            doctorToUpdate = { speciality, count: 0 };
            hospital.doctors.push(doctorToUpdate);
        }
        doctorToUpdate.count = count;
        await hospital.save();
        res.status(200).json({ message: 'Doctor count updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { registerHospital, createOperationTheatre, addMedicalEquipment,updateDoctor,createDoctor };
