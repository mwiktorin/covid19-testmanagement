const geolib = require('geolib');

const GeoExterns = require('../extern/geo');
const mockData = require('../mock-data');

function TestZentrumController() {
    const testCenters = []

    this.add = function (testCenterData) {
        testCenters.push(testCenterData)
    }

    this.list = function () {
        return testCenters
    }

    this.generateZeitSlots = function (uuid, parallel, durationInMinutes, fromHour, toHour) {
        const foundCenter = testCenters.find(centrum => centrum.uuid === uuid);
        if(!foundCenter) {
            throw new Error("testcenter not found");
        }
        foundCenter.addZeitslots(parallel, durationInMinutes, fromHour, toHour);
    }

    this.findNearest = function (coords) {
        var distances = testCenters.map((testCenter) => {
            return {
                testCenter: testCenter,
                distance: geolib.getDistance(coords, testCenter.koordinaten),
            };
        });
        distances.sort((a, b) => a.distance - b.distance);

        return distances[0].testCenter;
    }

    this.requestTestSlot = async function (patient) {
        // find next testing facility
        const patientCoords = await GeoExterns.coordinatesForPostalCode(patient.plz);
        const testCenter = this.findNearest(patientCoords);

        // find next available time slot
        var testSlot = testCenter.findFreeTestSlot();

        // reserve slot
        testSlot.reserve(patient.uuid, testSlot);

        return {
            testCenter,
            testSlot
        };
    }

    mockData.mockCenters(this);
}

module.exports = TestZentrumController;
