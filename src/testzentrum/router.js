const express = require('express');
const dayjs = require('dayjs');

const Testzentrum = require('./testzentrum');
const TestCenterController = require('./controller');
const { ContactHours, TestSlot } = require('../zeitslot/contacthours');
const GeoExterns = require('../extern/geo');

const { defaultErrorWrapper, NotFound } = require('../error');

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

    function formatContactHours(ch) {
        slots = [];
        for (var i = 0; i < ch.timeSlots; i++) {
            const reserved = ch.reservedSlots[i];
            const slotRepr = new TestSlot(ch, i);
            slots.push({
                slotId: slotRepr.slotId,
                begin: slotRepr.begin,
                end: slotRepr.end,
                reservation: reserved ? {
                    uuid: reserved.uuid,
                    vorname: reserved.vorname,
                    nachname: reserved.nachname,
                } : null,
            })
        }
        return {
            id: ch.uuid,
            begin: ch.begin,
            end: ch.end,
            slots: slots,
            slotDurationMinutes: ch.timeSlotDurationMinutes,
        }
    }
    router.get('/:centerUuid/contact-hours', defaultErrorWrapper(async function (req, res) {
        const testCenter = testCenterController.get(req.params.centerUuid);
        if (!testCenter) {
            throw new NotFound(`No Test Center with UUID ${req.params.centerUuid}`);
        }

        res.status(200).json(testCenter.getContactHours().map(ch => formatContactHours(ch)));
    }));

    router.post('/:centerUuid/contact-hours', defaultErrorWrapper(async function (req, res) {
        const testCenter = testCenterController.get(req.params.centerUuid);
        if (!testCenter) {
            throw new NotFound(`No Test Center with UUID ${req.params.centerUuid}`);
        }

        var { begin, end, slotDurationMinutes, parallel } = req.body;
        parallel = parallel || 1;
        begin = dayjs(begin);
        end = dayjs(end);
        const slotCount = Math.floor(end.diff(begin, 'minute') / slotDurationMinutes);

        // construct respective contact hours
        var result = [];
        for (var i = 0; i < parallel; i++) {
            const ch = new ContactHours(begin, slotCount, slotDurationMinutes);
            testCenter.addContactHours(ch);
            result.push(formatContactHours(ch));
        }
        res.status(200).json(result);
    }));

    router.get('/:centerUuid/contact-hours/:contactHoursId', defaultErrorWrapper(async function (req, res) {
        const testCenter = testCenterController.get(req.params.centerUuid);
        if (!testCenter) {
            throw new NotFound(`No Test Center with UUID ${req.params.centerUuid}`);
        }

        const ch = testCenter.getContactHours(req.params.contactHoursId);
        if (!ch) {
            throw new NotFound(`No Contact Hours with ID ${req.params.contactHoursId} for Test Center ${testCenter.name}`);
        }

        res.status(200).json(formatContactHours(ch));
    }));

    /*
    router.put('/:centerUuid/contact-hours/:contactHoursId', defaultErrorWrapper(async function (req, res) {
        const testCenter = testCenterController.get(req.params.centerUuid);
        if (!testCenter) {
            throw new NotFound(`No Test Center with UUID ${req.params.centerUuid}`);
        }

        const contactHours = testCenter.getContactHours(req.params.contactHoursId);
        if (!contactHours) {
            throw new NotFound(`No Contact Hours with ID ${req.params.contactHoursId} for Test Center ${testCenter.name}`);
        }

        contactHours.reservedSlots
    }));
    */

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
