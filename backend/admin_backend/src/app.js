const express = require("express");
const app = express();
require("dotenv").config();
const db = require("../config/db");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use(express.json());

const eventsRoutes = require("./routes/eventsRoutes");
const imageRoutes = require("./routes/imageRoutes");
const loginRoutes = require("./routes/loginRoutes");
const addFormController = require("./controllers/addFormController");
const eventStatusChangeController = require("./controllers/eventStatusChangeController");
const registeredUsersController = require("./controllers/registeredUsersController");
const getAllEventToCSVController = require("./controllers/getAllEventToCSVController");

app.use("/api/uploadImage", imageRoutes);
// app.use('/api/clubs', clubRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/login", loginRoutes);
app.use("/login", loginRoutes);
app.use("/addForm", addFormController);
app.use("/api/toggleEventStatus", eventStatusChangeController);
app.use("/api/getRegistedUsers", registeredUsersController);
app.use("/api/getAllEventRegistedUsers", getAllEventToCSVController);

const PORT = process.env.PORT || 5555;
app
  .listen(PORT, () => {
    // nstdeployments
    // dzrU1CoPs2jwautw
    console.log(`Running at ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
