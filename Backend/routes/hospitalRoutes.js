const express = require('express');
const { registerHospital,addMedicalEquipment, createOperationTheatre, updateMedicalEquipment, updateOperationTheatre, createDoctor, updateDoctor, getHospitals, getHospital, loginHospital, sendNotification, rejectionHospitalInformation } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);
router.post('/loginHospital', loginHospital);
router.post('/:hospitalId/operation-theatre', createOperationTheatre);
router.post("/addMedicalEquipment",addMedicalEquipment);
router.put('/updateMedicalEquipment', updateMedicalEquipment);
router.put('/updateOperationTheatre/:hospitalId', updateOperationTheatre);
router.post('/createDoctor', createDoctor);
router.put('/updateDoctor', updateDoctor);
router.get('/getHospitals', getHospitals);
router.get('/getHospital', getHospital);
router.post('/sendNotification', sendNotification);
router.get('/rejectionHospitalInformation', rejectionHospitalInformation);

module.exports = router;