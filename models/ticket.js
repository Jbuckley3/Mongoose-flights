const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seat: { type: String, match: /[A-F][1-9]\d?/ },
  price: { type: Number, min: 0 },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
