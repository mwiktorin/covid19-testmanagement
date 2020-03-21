const express = require('express');

const Testzentrum = require('./testzentrum');
const TestCenterController = require('./controller');

function TestCenterRouter() {
    const router = express.Router();
    const testCenterController = new TestCenterController();

    // define the home page route
    router.post('/', function (req, res) {
        const {name, telefonnummer, anschrift, plz} = req.body;
        const testzentrum = new Testzentrum(name, telefonnummer, anschrift, plz);
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

    this.router = router;
}

module.exports = TestCenterRouter;
