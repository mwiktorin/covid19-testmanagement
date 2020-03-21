const express = require('express');

const PatientController = require('../patient/controller');
const Testzentrum = require('./testzentrum');
const TestCenterController = require('./controller');

const { defaultErrorWrapper } = require('../error');

function TestCenterRouter() {
    const router = express.Router();
    const testCenterController = new TestCenterController();
    const patientController = new PatientController();

    // define the home page route
    router.post('/', function (req, res) {
        const {name, telefonnummer, anschrift, plz} = req.body;
        const coords = plzExterns.coordinatesForPostalCode(plz);
        const testzentrum = new Testzentrum(name, telefonnummer, anschrift, plz, coords);
        testCenterController.add(testzentrum);
        res.status(200).json(testzentrum);
    });

    router.put('/:uuid', function (req, res) {
        const {parallel, durationInMinutes, fromMinute, toMinute} = req.body;
        testCenterController.generateZeitSlots(req.params.uuid, parallel, durationInMinutes, fromMinute, toMinute);
        res.sendStatus(200);
    });

    // define the about route
    router.get('/', function (req, res) {
        res.json(testCenterController.list());
    });

    // route for requesting a test
    router.post('/test-beantragen/:uuid', defaultErrorWrapper(async function (req, res) {
        // retrieve requestor data
        const uuid = req.params.uuid;
        const patient = patientController.get(uuid);

        const { testCenter, testSlot } = await testCenterController.requestTestSlot(patient);

        // send answer
        res.status(200).json({
            testCenter: testCenter,
            when: testSlot.begin.unix(),
        });
    }));

    this.router = router;
}

module.exports = TestCenterRouter;
