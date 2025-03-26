const Event = require('../api/models/Event');
const User = require('../api/models/User');
const cloudinary = require('../config/cloudinary');

const createEvent = async ({
  title,
  startDate,
  endDate,
  location,
  description,
  capacity,
  poster,
  userId,
  favorite,
  reqUser,
  attendees = []
}) => {
  try {
    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      !capacity
    ) {
      throw new Error('Los campos obligatorios deben ser completados');
    }

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) throw new Error('Este evento ya está registrado.');

    const user = await User.findById(userId);
    if (!user) throw new Error('El usuario no existe.');

    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      throw new Error('Las fechas proporcionadas no son válidas.');
    }

    let verified = false;

    if (reqUser && reqUser.rol === 'admin') {
      verified = true;
    }

    const newEvent = new Event({
      title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      location,
      description,
      capacity,
      poster,
      favorite: favorite,
      verified: verified,
      userId: userId,
      attendees: attendees
    });

    const eventSaved = await newEvent.save();
    return eventSaved;
  } catch (error) {
    console.error('Error al guardar evento en la base de datos:', error);
    throw error;
  }
};

module.exports = createEvent;
