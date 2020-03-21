const express = require('express');

const Patient = require('./patient');
const PatientController = require('./controller');

function PatientRouter() {
    const router = express.Router();
    const patientController = new PatientController();

    // define the home page route
    router.post('/', function (req, res) {
        const {nachname, vorname, telefonnummer, anschrift, plz} = req.body;
        const patient = new Patient(nachname, vorname, telefonnummer, anschrift, plz);
        patientController.add(patient);
        res.status(200).json(patient);
    });

    // define the about route
    router.get('/', function (req, res) {
        res.json(patientController.list());
    });

    this.router = router;
}

module.exports = PatientRouter;
