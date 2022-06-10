// const assert = require("chai/lib/chai/interface/assert")

describe("MvcMessaging", () => {
    describe("#viewSend", () => {
        it("should capture user input", async () => {
            let count = 10
            let results = []
            for (let i = 0; i < count; i++) {
                results[i] = api.doThing({ "i": i })
            }
            Promise.all(results).then((res) => {
                assert.equal(res.length, count)
                for (let i = 0; i < count; i++) {
                    assert.equal(res[i].data.i, i)
                    assert.equal(res[i].data.x, i * i)
                }
            })
        })
    })
})
