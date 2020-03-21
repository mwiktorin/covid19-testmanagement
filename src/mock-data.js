const dayjs = require('dayjs');
const geo = require('./extern/geo');

const mockData = true;

async function mockPatients(controller) {
  if (!mockData) return;

  const Patient = require('./patient/patient');

  var patient = Object.assign(new Patient('maxmustermann@test.de', 'musterpass'), {
    vorname: 'Max',
    nachname: 'Mustermann',
    telefonnummer: '0123456789',
    anschrift: 'Testgasse 1',
    plz: 49219
  });
  controller.add(patient);
  console.log(`Mock Patient with UUID ${patient.uuid}`);
}


async function mockCenters(controller) {
  if (!mockData) return;

  const { ContactHours } = require('./zeitslot/contacthours');
  const Testzentrum = require('./testzentrum/testzentrum');

  var testc = new Testzentrum('Test Zentrum', '987654321', 'Krankenhausstraße 1', 49219, await geo.coordinatesForPostalCode(49219));
  testc.addContactHours(new ContactHours(dayjs().add(1, 'day'), 5, 15));
  controller.add(testc);
}


module.exports = {
  mockPatients,
  mockCenters
}
