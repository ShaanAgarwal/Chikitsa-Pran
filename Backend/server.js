import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
const app = express();

app.use(express.json());

app.use(cookieParser());
dotenv.config();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });