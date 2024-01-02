const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all flights. */
router.get('/flights', async function(req, res, next) {
  try {
    const flights = await Flight.find();
    res.render('flights/index', { flights: flights });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET new flight form. */
router.get('/flights/new', function(req, res, next) {
  res.render('flights/new');
});

/* POST new flight. */
router.post('/flights', async function(req, res, next) {
  try {
    // Extract flight data from the form submission
    const { airline, airport, flightNo, departs } = req.body;
    
    // Create a new flight document
    const newFlight = new Flight({
      airline: airline,
      airport: airport,
      flightNo: flightNo,
      departs: departs,
    });

    // Save the new flight to the database
    await newFlight.save();

    // Redirect to the list of all flights after successfully adding a new flight
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET details page for a specific flight. */
router.get('/flights/:id', async function(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id);
    const tickets = await Ticket.find({ flight: flight._id });
    res.render('flights/show', { flight, tickets });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* GET new ticket form for a specific flight. */
router.get('/flights/:id/tickets/new', function(req, res, next) {
  res.render('tickets/new', { flightId: req.params.id });
});

/* POST create a new ticket for a specific flight. */
router.post('/flights/:id/tickets', async function(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id);

    // Ensure the flight property is added to req.body
    req.body.flight = flight._id;

    // Create a new ticket document
    const newTicket = new Ticket(req.body);

    // Save the new ticket to the database
    await newTicket.save();

    // Redirect back to the show view for that flight
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
