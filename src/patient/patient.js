const {v4} = require("uuid");

class Patient {
     constructor(nachname, vorname, telefonnummer, anschrift, plz) {
        this.uuid = v4();
        this.nachname = nachname;
        this.vorname = vorname;
        this.telefonnummer = telefonnummer;
        this.anschrift = anschrift;
        this.plz = plz;
    }
}

module.exports = Patient;
