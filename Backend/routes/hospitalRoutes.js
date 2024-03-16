const express = require('express');
const { registerHospital, createOperationTheatre } = require('../controller/hospitalController');
const router = express.Router();

router.post('/registerHospital', registerHospital);
router.post('/:hospitalId/operation-theatre', createOperationTheatre);

module.exports = router;