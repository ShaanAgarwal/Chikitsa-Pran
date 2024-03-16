const express = require('express');
const { registerHospital,addMedicalEquipment, createOperationTheatre, updateMedicalEquipment, updateOperationTheatre, createDoctor, updateDoctor } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);
router.post('/:hospitalId/operation-theatre', createOperationTheatre);
router.post("/addMedicalEquipment",addMedicalEquipment);
router.put('/updateMedicalEquipment', updateMedicalEquipment);
router.put('/updateOperationTheatre/:hospitalId', updateOperationTheatre);
router.post('/createDoctor', createDoctor);
router.put('/updateDoctor', updateDoctor);

module.exports = router;