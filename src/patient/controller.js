function PatientController() {
    const patienten = {};

    this.add = function (patient) {
        patienten[patient.uuid] = patient;
    };

    this.list = function () {
        return Object.values(patienten);
    };

    this.getByUuid = function (uuid) {
        return patienten[uuid];
    };
    this.getByEmailAddress = function (emailAddress) {
        return Object.values(patienten).find((patient) => patient.email === emailAddress);
    };

    this.checkPassword = function (patient, password) {
        return patient.passwort === password;
    };
}

module.exports = PatientController;
