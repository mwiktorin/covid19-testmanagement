const Zeitslot = require("../zeitslot/zeitslot")
const { v4 }  = require("uuid");

class Testzentrum {

    constructor(name, telefonnummer, anschrift, plz) {
        this.uuid = v4();
        this.name = name;
        this.telefonnummer = telefonnummer;
        this.anschrift = anschrift;
        this.plz = plz;
        this.zeitslots = [];
    }

    addZeitslots(parallel, durationInMinutes, fromMinute, toMinute) {
        let minute = fromMinute;
        while(minute + durationInMinutes < toMinute) {
            for(let i = 0; i < parallel; i++) {
                const slot = new Zeitslot(minute, durationInMinutes);
                this.zeitslots.push(slot);
            }
            minute += durationInMinutes;
        }
    }
}

module.exports = Testzentrum