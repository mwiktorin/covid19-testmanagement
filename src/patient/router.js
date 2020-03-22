const express = require('express');

const Patient = require('./patient');
const {PatientSession} = require('../session');

const {defaultErrorWrapper} = require('../error');

function PatientRouter(patientController) {
    const router = express.Router();

    // define the home page route
    router.post('/', function (req, res) {
        const {nachname, vorname, telefonnummer, anschrift, plz} = req.body;
        const patient = new Patient(nachname, vorname, telefonnummer, anschrift, plz);
        patientController.add(patient);
        res.status(200).json(patient);
    });

    // define the about route
    router.get('/', function (req, res) {
        res.status(200).json(patientController.list());
    });


    router.post('/registrieren', defaultErrorWrapper(async function (req, res) {
        if (req.session.obj) {
            // should only allow registration when not logged into
            // another account
            res.sendStatus(409 /* CONFLICT */);
            return;
        }

        const {email, passwort} = req.body;
        const patient = new Patient(email, passwort);
        patientController.add(patient);

        req.session.obj = new PatientSession(patient);
        res.sendStatus(200);
    }));

    router.get('/profil', defaultErrorWrapper(async function (req, res) {
        if (!req.session.obj || req.session.obj.role !== PatientSession.ROLE) {
            res.sendStatus(400);
            return;
        }

        const p = req.session.obj.data;
        res.status(200).json({
            vorname: p.vorname,
            nachname: p.nachname,
            telefonnummer: p.telefonnummer,
            anschrift: p.anschrift,
            plz: p.plz,
            prefBenachrichtigung: p.prefBenachrichtigung,
        });
    }));
    router.put('/profil', defaultErrorWrapper(async function (req, res) {
        if (!req.session.obj || req.session.obj.role !== PatientSession.ROLE) {
            res.sendStatus(400);
            return;
        }

        const {vorname, nachname, telefonnummer, anschrift, plz, prefBenachrichtigung} = req.body;
        Object.assign(req.session.obj.data, {
            vorname, nachname, telefonnummer, anschrift, plz, prefBenachrichtigung
        });
        res.sendStatus(200);
    }));

    router.post('/login', defaultErrorWrapper(async function (req, res) {
        if (req.session.obj) {
            // already logged in
            res.sendStatus(409 /* CONFLICT */);
            return;
        }

        const {email, passwort} = req.body;
        const patient = patientController.getByEmailAddress(email);
        if (patientController.checkPassword(patient, passwort)) {
            req.session.obj = new PatientSession(patient);
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }));
    router.post('/logout', defaultErrorWrapper(async function (req, res) {
        if (!req.session.obj) {
            // not logged in
            res.sendStatus(400);
            return;
        }

        req.session.destroy();
        res.sendStatus(200);
    }));

    this.router = router;
}

module.exports = PatientRouter;
