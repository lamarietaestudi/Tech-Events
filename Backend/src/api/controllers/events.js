const Event = require('../models/Event');
const { errorHandler } = require('../../middlewares/errorHandler');
const createEvent = require('../../utils/createEvent');
const deleteCloudinaryImage = require('../../utils/deleteCloudinaryImg');
const cloudinary = require('../../config/cloudinary');

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ verified: true });
    return res.status(200).json(events);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getEventByDate = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;

    let query = { verified: true };

    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    } else if (startDate) {
      query.startDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.endDate = { $lte: new Date(endDate) };
    }

    const events = await Event.find(query);

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay eventos para esta fecha.' });
    }

    return res.status(200).json(events);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getEventByLocation = async (req, res, next) => {
  try {
    const { location } = req.params;
    const caseInsensitive = new RegExp(location, 'i');
    const events = await Event.find({
      location: caseInsensitive,
      verified: true
    });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay eventos para esta ubicación.' });
    }
    return res.status(200).json(events);
  } catch (error) {
    return errorHandler(res, error);
  }
};

const getPendingEvents = async (req, res, next) => {
  try {
    if (req.user.rol !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Se requieren permisos de admnistrador.' });
    }
    const pendingEvents = await Event.find({ verified: false });
    return res.status(200).json(pendingEvents);
  } catch (error) {
    return errorHandler(res, error);
  }
};
const postEvent = async (req, res, next) => {
  try {
    const {
      title,
      startDate,
      endDate,
      location,
      description,
      capacity,
      favorite,
      verified
    } = req.body;

    const poster = req.file?.path;
    const userId = req.user._id;

    const eventSaved = await createEvent({
      title,
      startDate,
      endDate,
      location,
      description,
      capacity,
      poster,
      userId,
      favorite,
      reqUser: req.user
    });

    return res
      .status(201)
      .json({ message: 'Evento guardado correctamente.', eventSaved });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const updateEvent = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const { id } = req.params;
    const eventToUpdate = await Event.findById(id);

    if (!eventToUpdate) {
      return res.status(404).json({ message: 'Este evento no existe.' });
    }

    if (req.user.rol !== 'admin') {
      if (eventToUpdate.userId.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: 'No tienes permisos para actualizar este evento.' });
      }
    }

    if (req.file) {
      if (eventToUpdate.poster) {
        try {
          await deleteCloudinaryImage(eventToUpdate.poster);
        } catch (deleteError) {
          console.error(
            'Error al eliminar la imagen anterior de Cloudinary:',
            deleteError
          );
        }
      }

      console.log('req.file.path:', req.file.path);

      eventToUpdate.poster = req.file.path;
    }

    for (const key in req.body) {
      if (eventToUpdate[key] !== undefined && req.body[key] !== '') {
        if (key === 'favorite' || key === 'verified') {
          eventToUpdate[key] = req.body[key] === 'true';
        } else {
          eventToUpdate[key] = req.body[key];
        }
      }
    }

    const eventUpdated = await eventToUpdate.save();

    return res.status(200).json({
      message: 'Evento actualizado correctamente.',
      event: eventUpdated
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventToDelete = await Event.findById(id);
    if (!eventToDelete)
      return res.status(404).json({ message: 'Evento no encontrado' });

    if (req.user.rol !== 'admin') {
      if (eventToDelete.userId.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: 'No tienes permisos para actualizar este evento.' });
      }
    }
    await deleteCloudinaryImage(eventToDelete.poster);
    const eventDeleted = await Event.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Evento eliminado correctamente.',
      eventDeleted
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

module.exports = {
  getEvents,
  getEventByDate,
  getEventByLocation,
  getPendingEvents,
  postEvent,
  updateEvent,
  deleteEvent
};
