const geolib = require('geolib');
const request = require('request-promise-native');

async function coordinatesForPostalCode(plz) {
  const queryResult = await request({
    method: 'GET',
    uri: `https://public.opendatasoft.com/api/records/1.0/search/?dataset=postleitzahlen-deutschland&refine.plz=${plz}`,
    json: true,
  });

  if (queryResult.records.length < 1) {
    throw new Error(`Postal code ${plz} does not exist`);
  } else {
    const coordArray = queryResult.records[0].fields.geo_point_2d;
    return {
      latitude: coordArray[0],
      longitude: coordArray[1],
    };
  }
}


module.exports = { coordinatesForPostalCode };
