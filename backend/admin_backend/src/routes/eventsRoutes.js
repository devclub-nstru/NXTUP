const express = require("express");

const {fetchEvents} = require('../controllers/eventsController')

const {addEvent} = require('../controllers/eventsController')

const {updateEvent} = require('../controllers/eventsController')

const router = express.Router()

router.get('/', fetchEvents)
router.post('/', addEvent)
router.patch('/', updateEvent)
router.delete('/')
 
module.exports = router;