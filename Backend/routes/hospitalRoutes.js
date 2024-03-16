const express = require('express');
const { registerHospital,addMedicalEquipment, createOperationTheatre } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);
router.post('/:hospitalId/operation-theatre', createOperationTheatre);
router.post("/addMedicalEquipment",addMedicalEquipment);

module.exports = router;