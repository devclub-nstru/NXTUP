const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: String,
    Date: Number,
    Time: String,
    Location: String,
    Rulebook: String,
    Registered: { type: Number, default: 0 },
    TeamSizeStart: Number,
    TeamSizeEnd: Number,
    Prize: Number,
    Deadline: Number,
    Cost: Number,
    Banner: String,
    Organizer: String,
    Form: { type: Object, required: false, default: {} },
    IsActive: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const events = mongoose.model("events", eventsSchema);
module.exports = events;
