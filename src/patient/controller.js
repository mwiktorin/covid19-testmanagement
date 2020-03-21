const mockData = require('../mock-data');

function PatientController() {
    const patienten = {};

    this.add = function (patient) {
        patienten[patient.uuid] = patient;
    };

    this.list = function () {
        return Object.values(patienten);
    };

    this.get = function (uuid) {
        return patienten[uuid];
    }

    mockData.mockPatients(this);
}

module.exports = PatientController;
