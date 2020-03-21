const {v4} = require("uuid");

class Patient {
    constructor (email, passwort) {
        this.email = email;
        this.passwort = passwort;
        this.uuid = v4();

        this.nachname = null;
        this.vorname = null;
        this.telefonnummer = null;
        this.anschrift = null;
        this.plz = null;
    }

    /* constructor(nachname, vorname, telefonnummer, anschrift, plz) {
        this.uuid = v4();
        this.nachname = nachname;
        this.vorname = vorname;
        this.telefonnummer = telefonnummer;
        this.anschrift = anschrift;
        this.plz = plz;
    } */
}

module.exports = Patient;
