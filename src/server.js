const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TestZentrumRouter = require('./testzentrum/router');
const PatientRouter = require('./patient/router');
const cors = require('cors');
const session = require('express-session');

const app = express();

if (process.env.ENV === 'local') {
    app.use(cors());
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../ui/build')));
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'wirvsvirussurivsvriw',
}))

app.use('/api/testzentrum', new TestZentrumRouter().router);
app.use('/api/patient', new PatientRouter().router);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../ui/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
