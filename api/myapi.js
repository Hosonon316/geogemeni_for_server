// api/myapi.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/geocode', async (req, res) => {
    const location = req.query.location;
    
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            res.json(response.data.results[0].geometry.location);
        } else {
            res.status(500).json({ error: 'Geocode failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
