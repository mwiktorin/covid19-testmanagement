const {v4} = require("uuid");
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
            (a, b) => a.uuid == b.uuid,
            (a, b) => a.begin.unix() - b.begin.unix() || a.id - b.id,
        );
    }

    addContactHours(contactHours) {
        this.contactHours.push(contactHours);
    }

    getContactHours(id) {
        if (id == undefined) {
            return this.contactHours;
        } else {
            var iterator = this.contactHours.iterate();
            var contactHours;
            while (contactHours = iterator.next().value) {
                if (contactHours.uuid == id) {
                    return contactHours;
                }
            }
            return null;
        }
    }

    findFreeTestSlot() {
        var array = Array.from(this.contactHours);
        var earliestSlot = null;
        var contactHours;
        for (let i = 0; i < array.length; i++) {
            contactHours = array[i];
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
