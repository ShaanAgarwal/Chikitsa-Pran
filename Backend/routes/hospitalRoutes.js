const express = require('express');
const { registerHospital,addMedicalEquipment } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);
router.post("/addMedicalEquipment",addMedicalEquipment);

module.exports = router;