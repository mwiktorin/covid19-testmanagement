class Session {
  constructor (role, data) {
    this.role = role;
    this.data = data;
  }
}

class PatientSession extends Session {
  constructor (patientData) {
    super(PatientSession.ROLE, patientData);
  }
}
PatientSession.ROLE = 'patient';

class TestCenterSession extends Session {
  constructor (testCenterData) {
    super(TestCenterSession.ROLE, testCenterData);
  }
}
TestCenterSession.ROLE = 'test-center':

module.exports = {
  PatientSession,
  TestCenterSession,
}
