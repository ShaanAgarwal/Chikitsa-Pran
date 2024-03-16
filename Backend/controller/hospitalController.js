const express = require('express');
const Hospital = require('../models/hospitals.models');
const diseasesData = require("../diseaseData");
const geolib = require("geolib");

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

const getHospitals = async (req, res) => {
    try {
        const { latitude, longitude, disease } = req.query;
        if (!latitude || !longitude || !disease) {
            return res.status(400).json({ message: "Latitude, longitude, and disease are required." });
        };
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);
        const hospitals = await Hospital.find();
        const hospitalsWithDistances = hospitals.map(hospital => {
            const hospitalLatitude = hospital.location.latitude;
            const hospitalLongitude = hospital.location.longitude;
            const distance = geolib.getDistance(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: hospitalLatitude, longitude: hospitalLongitude }
            );
            console.log(distance);
            return { ...hospital.toObject(), distance };
        });
        hospitalsWithDistances.sort((a, b) => a.distance - b.distance);
        const diseaseData = diseasesData.find(item => item.disease.toLowerCase() === disease.toLowerCase());
        if (!diseaseData) {
            return res.status(404).json({ message: "Disease not found." });
        };
        const filteredHospitals = hospitalsWithDistances.filter(hospital => {
            const isEquipmentAvailable = diseaseData.medicalEquipment.every(reqEquipment => {
                const hospitalEquipment = hospital.medicalEquipment.find(item => item.name === reqEquipment.name);
                return hospitalEquipment && hospitalEquipment.count >= reqEquipment.count;
            });
            const isOperationTheatreAvailable = diseaseData.operationTheatres.every(reqTheatre => {
                return hospital.operationTheatres.some(theatre => theatre.name === reqTheatre.name);
            });
            const isDoctorAvailable = diseaseData.doctors.every(reqDoctor => {
                const hospitalDoctor = hospital.doctors.find(doctor => doctor.speciality === reqDoctor.speciality);
                return hospitalDoctor && hospitalDoctor.count >= reqDoctor.count;
            });
            return isEquipmentAvailable && isOperationTheatreAvailable && isDoctorAvailable;
        });
        res.json(filteredHospitals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    };
};

const getHospital = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({ message: "Email not found", success: false });
        };
        const hospital = await Hospital.findOne({ email: email });
        if (!hospital) {
            return res.status(404).json({ message: "Hospital with given email does not exist", success: false });
        };
        return res.status(200).json({ message: "Hospital Found", hospital, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

module.exports = { registerHospital, createOperationTheatre, updateMedicalEquipment, addMedicalEquipment, updateOperationTheatre, updateDoctor, createDoctor, getHospitals, getHospital };
