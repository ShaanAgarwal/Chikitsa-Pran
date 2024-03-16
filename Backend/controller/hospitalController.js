import express from "express";

export const registerHospital = async (req, res) => {
    try {
        return res.status(200).json({ message: "Running Properly", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    };
};