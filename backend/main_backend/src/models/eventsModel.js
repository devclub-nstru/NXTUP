const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Date: { type: Date, required: true }, 
  Location: { type: String, required: true },
  Rulebook: { type: String, default: null }, 
  Registered: { type: Number, default: 0, min: 0 }, 
  TeamSize: { type: Number, required: true, min: 1 },
  Prize: { type: Number, default: 0, min: 0 },
  Deadline: { type: Date, required: true }, 
  Cost: { type: Number, default: 0, min: 0 },
  Banner: { type: String, default: null }, 
  ClubLinkedTo: { type: String, required: true },
  Form: { type: String, default: null } 
});


const Event = mongoose.model('Event', eventsSchema);

module.exports = Event;
