const dayjs = require('dayjs');

class TestSlot {
  constructor (contactHours, slotId) {
    this.contactHours = contactHours;
    this.slotId = slotId;

    Object.defineProperties(this, {
      begin: {
        configurable: false,
        enumerable: true,
        get: function () {
          return this.contactHours.begin.add(
            slotId * this.contactHours.slotDurationInMinutes, 'minutes');
        }
      },
      end: {
        configurable: false,
        enumerable: true,
        get: function () {
          return this.contactHours.begin.add(
            (slotId + 1) * this.contactHours.slotDurationInMinutes, 'minutes');
        }
      }
    });
  }

  reserve(patient) {
    return this.contactHours.reserve(patient, this.slotId);
  }
}

/// Timerange in which tests are conducted. Each test slot is of equal duration.
class ContactHours {
  constructor (beginDate, timeSlotCount, slotDurationInMinutes) {
    this.begin = dayjs(beginDate);
    this.end = this.begin.add(timeSlotCount * slotDurationInMinutes, 'minute');
    this.timeSlots = timeSlotCount;
    this.timeSlotDurationMinutes = slotDurationInMinutes;

    this.reservedSlots = [];
  }

  /// Finds next available slot ID.
  findFreeSlot() {
    if (this.reservedSlots.length < this.timeSlots) {
      return new TestSlot(this,
        this.reservedSlots.findIndex(element => !element)
        || this.reservedSlots.length
      );
    } else {
      return null;
    }
  }

  /// Registers a patient for a specific slot.
  reserve(patientId, slotId) {
    if (slotId == undefined) slotId = this.findFreeSlot().slotId;

    const currOccupation = this.reservedSlots[slotId];
    if (!currOccupation || currOccupation == patientId) {
      this.reservedSlots[slotId] = patientId;
      return slotId;

    } else {
      throw new Error("Slot already reserved");
    }
  }
}

module.exports = {
  ContactHours,
  TestSlot,
};
