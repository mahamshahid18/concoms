'use strict';

const express = require('express');
const cors = require('cors');
const companiesData = require('./constants/company-data');

const app = express();
app.use(cors());


app.listen(3000, () => {
    console.log('server started on port 3000');
});


app.get('/companies', (req, res) => {
    res.type('application/json');

    if (companiesData) {
        res.status(200).json(companiesData);
    } else {
        console.log('Error reading json source');
        res.status(500).send();
    }
});
