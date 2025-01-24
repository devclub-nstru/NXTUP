const Events = require('../models/eventsModel');
const express = require('express');
const router = express.Router();

const fetchEvents = async (req, res) => {
    try {
        const events = await Events.find({}); 

        if (events.length > 0) {
            return res.status(200).json({
                success: true,
                data: events,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No events found.",
            });
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching event data.",
            error: error.message,
        });
    }
};

router.get('/', fetchEvents);

module.exports = router;
