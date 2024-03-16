const express = require('express');
const { registerHospital } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);

module.exports = router;