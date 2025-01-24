const express = require('express');
const router = express.Router();
const Submits = require('../models/submitModel');
const Events =  require('../models/eventsModel');
const postSubmit = async (req, res) => {
    try {
        const { eventId, studentDetails } = req.body;

        if (!eventId || !studentDetails) {
            return res.status(400).json({
                success: false,
                message: "Name and content are required.",
            });
        }

        const newSubmit = new Submits({ eventId, studentDetails });

        const savedSubmit = await newSubmit.save();

        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }
        // event.registrationcount = (event.registrationcount || 0) + 1;
        await Events.findByIdAndUpdate(eventId,{Registered:event.Registered+1})

        return res.status(201).json({
            success: true,
            message: "Submission created successfully.",
        });
    } catch (error) {
        console.error("Error creating submission:", error);


        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the submission.",
            error: error.message,
        });
    }
};


router.post('/', postSubmit);

module.exports = router;
