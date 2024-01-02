const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNo: {
    type: String,
    required: true,
  },
  departs: {
    type: Date,
    required: true,
  },
  destinations: [destinationSchema], // Array of destination subdocuments
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;



/* const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, enum: ['American', 'Southwest', 'United', 'Delta'], required: true },
  airport: { type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN' },
  flightNo: { type: Number, required: true, min: 10, max: 9999 },
  departs: { type: Date, default: () => new Date().setFullYear(new Date().getFullYear() + 1) },
});

module.exports = mongoose.model('Flight', flightSchema); */
