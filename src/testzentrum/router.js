const express = require('express');

const Testzentrum = require('./testzentrum');
const TestCenterController = require('./controller');
const GeoExterns = require("../extern/geo");

const {defaultErrorWrapper} = require('../error');

function TestCenterRouter(patientController) {
    const router = express.Router();
    const testCenterController = new TestCenterController();

    // define the home page route
    router.post('/', function (req, res) {
        const {name, telefonnummer, anschrift, plz} = req.body;
        const coords = GeoExterns.coordinatesForPostalCode(plz);
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
        const patient = patientController.getByUuid(uuid);

        const {testCenter, testSlot} = await testCenterController.requestTestSlot(patient);

        // send answer
        res.status(200).json({
            testCenter: {
                uuid: testCenter.uuid,
                name: testCenter.name,
                telefonnummer: testCenter.telefonnummer,
                anschrift: testCenter.anschrift,
                plz: testCenter.plz,
            },
            when: testSlot.begin.unix(),
        });
    }));

    this.router = router;
}

module.exports = TestCenterRouter;
