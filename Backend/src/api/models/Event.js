const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true,
      trim: true
    },
    endDate: {
      type: Date,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    poster: {
      type: String
    },
    capacity: {
      type: String,
      required: true,
      default: 'Hasta agotar entradas',
      trim: true
    },
    favorite: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema, 'events'); // model name , Schema name , collection name

module.exports = Event;
