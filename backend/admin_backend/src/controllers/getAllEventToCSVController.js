const StudentRegistered = require("../models/submitModel");
const Event = require("../models/eventsModel");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  try {
    var { id } = req.query;
    if (!id) {
      return res.send({ status: false, message: "Please send a event id" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.send({ status: false, message: "Event not found" });
    }

    var dbres = await StudentRegistered.find({ eventId: id }).select({
      __v: 0,
    });
    if (!dbres[0]) {
      return res.send({ status: false, message: "Submission not found" });
    }
    dbres = JSON.parse(JSON.stringify(dbres));
    const transformedData = dbres.map((entry) => {
      const studentDetails = entry.studentDetails;
      return {
        event: event.Title,
        ...studentDetails,
        //   eventId: entry?.eventId,
      };
    });

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(transformedData);
    const fileName = `${event.Title.replace(
      /[^a-z0-9]/gi,
      "_"
    ).toLowerCase()}.csv`;
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, csv);
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ status: false, message: "Error in sending file" });
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.send({ status: false, message: "Error Occured" });
    console.log(error);
  }
};
