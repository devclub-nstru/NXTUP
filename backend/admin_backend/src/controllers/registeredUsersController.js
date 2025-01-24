const StudentRegistered = require("../models/submitModel");

module.exports = async (req, res) => {
  var { id } = req.body;
  if (!id) {
    return res.send({ status: false, message: "Please send a event id" });
  }
  var dbres = await StudentRegistered.find({ eventId: id }).select({ __v: 0 });
  return res.send({ status: true, data: dbres });
};
