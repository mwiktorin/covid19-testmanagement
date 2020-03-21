function TestZentrumController() {
    const testCenters = []

    this.add = function (testCenterData) {
        testCenters.push(testCenterData)
    } 

    this.list = function () {
        return testCenters
    }

    this.generateZeitSlots = function (uuid, parallel, durationInMinutes, fromHour, toHour) {
        const foundCenter = testCenters.find(centrum => centrum.uuid === uuid);
        if(!foundCenter) {
            throw new Error("testcenter not found");
        }
        foundCenter.addZeitslots(parallel, durationInMinutes, fromHour, toHour);
    }
}

module.exports = TestZentrumController;