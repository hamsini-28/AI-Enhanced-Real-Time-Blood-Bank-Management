const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },

  title: {
    type: String,
    required: [true, 'Event title is required'],
    minLength: [3, 'Title should be more than 3 characters'],
    trim: true,
  },

  type: {
    type: String,
    enum: ['Community Drives', 'Corporate Events', 'School Drives'], // ✅ Matches your frontend
    required: [true, 'Event type is required'],
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [10, 'Description should be more than 10 characters'],
    trim: true,
  },

  date: {
    type: Date,
    required: [true, 'Event date is required'],
    min: [new Date(), 'Event date cannot be in the past'],
  },

  // ✅ updated to support range text like "10:00 - 14:00"
  time: {
    type: String,
    required: [true, 'Event time is required'],
    match: [
      /^([01]\d|2[0-3]):([0-5]\d)(\s*-\s*([01]\d|2[0-3]):([0-5]\d))?$/,
      'Time must be in valid format (e.g. 10:00 or 10:00 - 14:00)',
    ],
  },

  venue: {
    type: String,
    required: [true, 'Venue is required'],
    minLength: [5, 'Venue should be more than 5 characters'],
    trim: true,
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Coordinates are required'],
    },
  },

  goal: {
    type: Number,
    required: [true, 'Goal (number of donors) is required'],
    min: [0, 'Goal cannot be negative'],
  },

  registered: {
    type: Number,
    default: 0,
    min: [0, 'Registrations cannot be negative'],
  },

  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Enable location-based queries
eventSchema.index({ location: '2dsphere' });

const EventModel = mongoose.model('Event', eventSchema);
module.exports = EventModel;
