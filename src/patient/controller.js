function PatientController() {
    const patienten = [];

    this.add = function (patient) {
        patienten.push(patient)
    };

    this.list = function () {
        return patienten;
    };
}

module.exports = PatientController;
