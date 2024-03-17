const express = require('express');
const Hospital = require('../models/hospitals.models');
const diseasesData = require("../diseaseData");
const geolib = require("geolib");
const { contactUsSendEmailSingle } = require('../utils/emailSend');
const Rejection = require('../models/rejection.models');
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');

const registerHospital = async (req, res) => {
    try {
        const { name, email, password, location, profilePicture } = req.body;
        if (!name || !email || !password || !location || !location.latitude || !location.longitude || !profilePicture) {
            return res.status(400).json({ message: 'Please provide name, email, password, location and profile Picture' });
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
            },
            profilePicture
        });
        await hospital.save();
        res.status(201).json({ message: 'Hospital registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    };
};

const loginHospital = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Fields are missing", success: false });
        };
        const existHospital = await Hospital.findOne({ email: email });
        if (!existHospital) {
            return res.status(404).json({ message: "Hospital with given email does not exist", success: false });
        };
        if (existHospital.password !== password) {
            return res.status(401).json({ message: "Password is incorrect", success: false });
        };
        return res.status(200).json({ message: "Authentication Successful", success: true, existHospital });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    };
};

const addMedicalEquipment = async (req, res) => {
    try {
        const { hospitalId, name, count, threshold, imageUrl } = req.body;
        if (!hospitalId || !name || !count || !threshold || count < 1 || !imageUrl) {
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
        hospital.medicalEquipment.push({ name, count, threshold, imageUrl });
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
        const { name, count, threshold } = req.body;
        const hospitalId = req.params.hospitalId;
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        };
        const existingOperationTheatre = hospital.operationTheatres.find(theatre => theatre.name === name);
        if (existingOperationTheatre) {
            return res.status(400).json({ message: 'Operation theatre with this name already exists.' });
        };
        hospital.operationTheatres.push({ name, count, threshold });
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
        const { hospitalId, speciality, count, threshold } = req.body;

        if (!hospitalId || !speciality || !count || !threshold) {
            return res.status(400).json({ message: 'Please provide hospitalId, speciality, and count for the doctor.' });
        };

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found.' });
        };

        hospital.doctors.push({ speciality, count, threshold });
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

const sendEmailsToHospitals = async (hospitalsWithInsufficientEquipment, disease) => {
    const emailPromises = hospitalsWithInsufficientEquipment.map(({ hospital }) => {
        const missingEquipment = disease.medicalEquipment.filter(reqEquipment => {
            const hospitalEquipment = hospital.medicalEquipment.find(item => item.name === reqEquipment.name);
            return !hospitalEquipment || hospitalEquipment.count < reqEquipment.count;
        });

        const emailContent = {
            to: hospital.email,
            subject: `Insufficient equipment for ${disease.disease}`,
            text: `Dear ${hospital.name},\n\n` +
                `We regret to inform you that your hospital does not have sufficient equipment for ${disease.disease} treatment.\n\n` +
                `The following equipment is missing or insufficient:\n\n` +
                missingEquipment.map(eq => `${eq.name}: ${eq.count} needed\n`).join('') +
                `\nPlease procure the necessary equipment at the earliest.\n\n` +
                `Sincerely,\nYour Healthcare Team`
        };

        return contactUsSendEmailSingle(emailContent.to, emailContent.text, emailContent.subject);
    });

    await Promise.all(emailPromises);
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
            return { hospital, distance };
        });
        hospitalsWithDistances.sort((a, b) => a.distance - b.distance);
        const selectedDisease = diseasesData.find(item => item.disease.toLowerCase() === disease.toLowerCase());
        if (!selectedDisease) {
            return res.json({ message: "Disease not found." });
        };
        const hospitalsWithInsufficientEquipment = hospitalsWithDistances.filter(({ hospital }) => {
            const missingEquipment = selectedDisease.medicalEquipment.some(reqEquipment => {
                const hospitalEquipment = hospital.medicalEquipment.find(item => item.name === reqEquipment.name);
                return !hospitalEquipment || hospitalEquipment.count < reqEquipment.count;
            });
            return missingEquipment;
        }).slice(0, 5); // Take only the top 5 hospitals with insufficient equipment

        // Increment rejection count and save to database for hospitals with insufficient equipment
        for (const { hospital } of hospitalsWithInsufficientEquipment) {
            hospital.rejectionCount = (hospital.rejectionCount || 0) + 1;
            await hospital.save();

            // Create a new record in the rejectionSchema
            const rejectionRecord = new Rejection({
                hospitalName: hospital.name,
                disease: disease,
                timestamp: new Date()
            });
            await rejectionRecord.save();
        }

        // Filter hospitals based on equipment, doctors, and theaters
        const filteredHospitals = hospitalsWithDistances.filter(({ hospital }) => {
            const missingEquipment = selectedDisease.medicalEquipment.some(reqEquipment => {
                const hospitalEquipment = hospital.medicalEquipment.find(item => item.name === reqEquipment.name);
                return !hospitalEquipment || hospitalEquipment.count < reqEquipment.count;
            });
            const missingDoctors = selectedDisease.doctors.some(reqDoctor => {
                const hospitalDoctor = hospital.doctors.find(doc => doc.speciality === reqDoctor.speciality);
                return !hospitalDoctor || hospitalDoctor.count < reqDoctor.count;
            });
            const missingTheaters = selectedDisease.operationTheatres.some(reqTheater => {
                const hospitalTheater = hospital.operationTheatres.find(theater => theater.name === reqTheater.name);
                return !hospitalTheater || hospitalTheater.count < reqTheater.count;
            });
            return !missingEquipment && !missingDoctors && !missingTheaters;
        });

        // Respond with filtered hospitals
        res.json({ hospitals: filteredHospitals.map(({ hospital }) => ({ name: hospital.name, location: hospital.location, profilePic: hospital.profilePicture, phoneNumber: hospital.phoneNumber, ambulancePhoneNumber: hospital.ambulancePhoneNumber })), disease });

        // Send emails to hospitals with insufficient equipment
        await sendEmailsToHospitals(hospitalsWithInsufficientEquipment, selectedDisease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    };
};

const getHospital = async (req, res) => {
    try {
        const { email } = req.query;
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

const sendNotification = async (req, res) => {
    try {
        const { hospitalname, email, symptoms } = req.body;
        const name = hospitalname;
        const disease = symptoms;
        const patientEmail = email;
        if (!name || !patientEmail || !disease) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };
        const hospital = await Hospital.findOne({ name: name });
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found", success: false });
        };
        const hospitalEmail = hospital.email;
        await contactUsSendEmailSingle(patientEmail, `Dear patient, you have an appointment for ${disease} treatment. https://www.google.com/maps/dir/?api=1&destination=${hospital.location.latitude},${hospital.location.longitude}, Ambulance Phone Number: ${hospital.ambulancePhoneNumber}`, "Your Appointment");
        await contactUsSendEmailSingle(hospitalEmail, "Notification: New Patient Appointment", `Dear hospital, you have a new appointment for ${disease} treatment from ${patientEmail}.`);
        return res.status(200).json({ message: "Notification sent successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const rejectionHospitalInformation = async (req, res) => {
    try {
        const hospitals = await Hospital.find({ rejectionCount: { $gte: 80 } });
        if (hospitals.length === 0) {
            return res.status(404).json({ message: "No hospitals found with rejection count greater than or equal to 80." });
        };
        const hospitalNames = hospitals.map(hospital => hospital.name).join(', ');
        await contactUsSendEmailSingle('chesstrainingone@gmail.com', `Hospitals with high rejection count (>=80): ${hospitalNames}`, 'Hospitals With High Rejection Count');
        return res.status(200).json({ message: "Email Sent Successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const sendExcelSheet = async (req,res) => {
    try {
        const rejections = await Rejection.find();
        if (rejections.length === 0) {
            return res.status(404).json({ message: "No rejection data found." });
        };
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Rejections');
        worksheet.addRow(['Hospital Name', 'Disease', 'Timestamp']);
        rejections.forEach(rejection => {
            worksheet.addRow([rejection.hospitalName, rejection.disease, rejection.timestamp]);
        });
        const buffer = await workbook.xlsx.writeBuffer();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chesstrainingone@gmail.com',
                pass: 'yeus dfbz xill lnii'
            }
        });
        const mailOptions = {
            from: 'chesstrainingone@gmail.com',
            to: 'chesstrainingone@gmail.com',
            subject: 'Rejection Data Export',
            text: 'Please find attached the rejection data export.',
            attachments: [
                {
                    filename: 'rejection_data.xlsx',
                    content: buffer
                }
            ]
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: "Rejection data exported and email sent successfully." });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = { registerHospital, createOperationTheatre, updateMedicalEquipment, addMedicalEquipment, updateOperationTheatre, updateDoctor, createDoctor, getHospitals, getHospital, loginHospital, sendNotification, rejectionHospitalInformation, sendExcelSheet };