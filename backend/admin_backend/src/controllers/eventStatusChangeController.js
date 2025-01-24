const events = require("../models/eventsModel");

module.exports = async (req, res) => {
  try {
    var { active, id } = req.body;
    var dbres = await events.findByIdAndUpdate(
      id,
      { IsActive: active },
      { new: true }
    );

    res.send({
      status: true,
      message: "Event " + (active ? "Activated" : "Deactivated"),
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: "Error Occured" });
  }
};
