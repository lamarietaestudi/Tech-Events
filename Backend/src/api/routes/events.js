const upload = require('../../middlewares/file');
const eventsRoute = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const {
  getEvents,
  getEventByDate,
  getEventByLocation,
  getPendingEvents,
  postEvent,
  updateEvent,
  deleteEvent,
  getAttendees,
  addAttendee
} = require('../controllers/events');

eventsRoute.get('/', getEvents);
eventsRoute.get('/date/', getEventByDate);
eventsRoute.get('/location/:location', getEventByLocation);
eventsRoute.get('/pending', isAuth, isAdmin, getPendingEvents);
eventsRoute.get('/:eventId/attendees', getAttendees);
eventsRoute.post('/:eventId/attendees', isAuth, addAttendee);
eventsRoute.post('/', isAuth, upload.single('poster'), postEvent);
eventsRoute.put('/:id', isAuth, upload.single('poster'), updateEvent);
eventsRoute.delete('/:id', isAuth, isAdmin, deleteEvent);

module.exports = eventsRoute;
