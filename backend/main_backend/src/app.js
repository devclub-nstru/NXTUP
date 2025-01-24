const express = require('express');
const app = express();
require('dotenv').config();
const db = require('../config/db')
const cors = require("cors")
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send("Hello!");
});


const clubRoutes = require('./routes/clubRoutes'); 
const eventsRoutes = require('./routes/eventsRoutes');
const submitRoutes = require('./routes/submitRoutes');

app.use('/clubs', clubRoutes);
app.use('/events', eventsRoutes);
app.use('/submits', submitRoutes);

const PORT = process.env.PORT || 5555;


app.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
});
