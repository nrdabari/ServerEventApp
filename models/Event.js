// models/Event.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: String,
  eventDescription: String,
  eventDate: Date,
  eventCategory: String,
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User', // Assuming you have a User model for authentication
  //   required: true,
  // },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
