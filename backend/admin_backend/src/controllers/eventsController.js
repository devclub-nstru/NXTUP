const { default: mongoose } = require("mongoose");
const Events = require("../models/eventsModel");

const fetchEvents = async (req, res) => {
  try {
    var events;
    if (req.query?.id) {
      events = await Events.find({ _id: req.query.id });
    } else {
      events = await Events.find({});
    }

    if (events.length > 0) {
      return res.status(200).json({
        success: true,
        status: true,
        data: events,
      });
    }

    return res.status(404).json({
      success: false,
      status: false,
      message: "No events found.",
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      status: false,
      message: "An error occurred while fetching event data.",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params.eventId;
    const updateData = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        status: false,
        message: "Event ID is required",
      });
    }

    const updatedEvent = await Events.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        status: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);

    return res.status(500).json({
      success: false,
      status: false,
      message: "An error occurred while updating the event.",
      error: error.message,
    });
  }
};

const addEvent = async (req, res) => {
  try {
    // Destructure event data from the request body
    const {
      title,
      description,
      banner,
      date,
      time,
      location,
      rulebook,
      organizer,
      prizeWorth,
      deadline,
      cost,
      teamSizeStart,
      teamSizeEnd,
    } = req.body;
    if (teamSizeStart < 0 || teamSizeEnd < 0) {
      return res.send({
        success: false,
        status: false,
        message: "Team size can't be negative.",
      });
    }
    // if (teamSizeEnd > teamSizeStart) {
    //   return res.send({
    //     success: false,
    //     status: false,
    //     message: "Max team size should be greater then min team size. ",
    //   });
    // }
    if (!title || !description || !location || !time || !Date) {
      console.log(title, description, location, time);
      return res.status(400).json({
        success: false,
        status: false,
        message: "All fields are required.",
      });
    }

    // Create a new event document
    const newEvent = new Events({
      Title: title,
      Description: description,
      Banner: banner,
      Date: date,
      Location: location,
      Time: time,
      Rulebook: rulebook,
      Organizer: organizer,
      Prize: prizeWorth,
      Deadline: deadline,
      Cost: cost,
      Banner: banner,
      TeamSizeStart: teamSizeStart,
      TeamSizeEnd: teamSizeEnd,
      IsActive: false,
    });

    // Save the new event to the database
    const savedEvent = await newEvent.save();

    return res.status(201).json({
      success: true,
      status: true,
      data: savedEvent,
      message: "Event created successfully.",
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      success: false,
      status: false,
      message: "An error occurred while creating the event.",
      error: error.message,
    });
  }
};

module.exports = {
  fetchEvents,
  updateEvent,
  addEvent,
};
