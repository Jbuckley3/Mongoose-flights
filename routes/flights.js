const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// Index route
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find({});
        res.render('flights/index', { flights });
    } catch (err) {
        console.error('Error fetching flights:', err.message);
        res.status(500).send('Error fetching flights');
    }
});

// New route
router.get('/new', (req, res) => {
    res.render('flights/new');
});

// Create route
router.post('/', async (req, res) => {
    try {
        const { airline, airport, flightNo, departs } = req.body;
        const newFlight = new Flight({ airline, airport, flightNo, departs });
        await newFlight.save();
        res.redirect('/flights');
    } catch (err) {
        console.error('Error creating flight:', err.message);
        res.status(500).send('Error creating flight');
    }
});

module.exports = router;
