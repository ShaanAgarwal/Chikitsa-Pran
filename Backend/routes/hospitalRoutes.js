import express from 'express';
import { registerHospital } from '../controller/hospitalController';
const router = express.Router();

router.post('/registerHospital', registerHospital);

export default router;