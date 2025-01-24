const Clubs = require('../models/clubModel');
const express = require('express');
const router = express.Router(); 

const fetchClubs = async (req, res) => {
    try {
        const clubs = await Clubs.find({});

        if (clubs.length > 0) {
            return res.status(200).json({
                success: true,
                data: clubs,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No clubs found.",
            });
        }
    } catch (error) {
        console.error("Error fetching clubs:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching club data.",
        });
    }
};


router.get('/', fetchClubs);

module.exports = router;
