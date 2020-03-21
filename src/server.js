const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TestZentrumRouter = require('./testzentrum/router');
const PatientRouter = require('./patient/router');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../ui/build')));

app.use('/api/testzentrum', new TestZentrumRouter().router);
app.use('/api/patient', new PatientRouter().router);

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../ui/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
