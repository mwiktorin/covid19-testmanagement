const { v4 }  = require("uuid");
const SortedSet = require('collections/sorted-set');

class Testzentrum {

    constructor(name, telefonnummer, anschrift, plz, koordinaten) {
        this.uuid = v4();
        this.name = name;
        this.telefonnummer = telefonnummer;
        this.anschrift = anschrift;
        this.plz = plz;
        this.koordinaten = koordinaten;

        this.contactHours = new SortedSet(
            [],
            (a, b) => a == b,
            (a, b) => a.begin.unix() - b.begin.unix()
        );
    }

    addContactHours(contactHours) {
        this.contactHours.push(contactHours);
    }

    findFreeTestSlot() {
        var earliestSlot = null;
        var contactHoursIt = this.contactHours.iterate();
        var contactHours;
        while (contactHours = contactHoursIt.next().value) {
            if (earliestSlot == null) {
                earliestSlot = contactHours.findFreeSlot();
            } else if (contactHours.begin <= earliestSlot.begin) {

                var freeSlot = contactHours.findFreeSlot();
                if (freeSlot && freeSlot.begin < earliestSlot.begin) {
                    earliestSlot = freeSlot;
                }

            } else {
                // this.contactHours sorted by beginning date, so following
                // contact hours would only yield later slots
                break;
            }
        }

        return earliestSlot;
    }
}

module.exports = Testzentrum
