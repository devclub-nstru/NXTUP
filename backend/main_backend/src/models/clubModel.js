const mongoose = require('mongoose');

const clubsSchema = new mongoose.Schema({
  President: { type: String, required: true },
  VicePresident: { type: String, required: true },
  CoreMembers: { 
    type: Map, 
    of: String, 
    default: {}, 
    required: true 
  },
  Description: { type: String, required: true },
  Images: { type: String, required: true }
});

const Club = mongoose.model("Club", clubsSchema);

module.exports = Club;
