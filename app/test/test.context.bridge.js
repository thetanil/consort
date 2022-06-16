// const assert = require("chai/lib/chai/interface/assert")

describe("ContextBridge", () => {
    describe("#do-thing", () => {
        it("should send do-thing fast", async () => {
            let count = 10
            let results = []
            for (let i = 0; i < count; i++) {
                results[i] = api.send('do-thing', { "i": i })
            }
            await Promise.all(results).then((res) => {
                assert.equal(res.length, count)
                for (let i = 0; i < count; i++) {
                    // console.log(`res: ${res[i]}`)
                    // console.dir(res[i].i)
                    assert.equal(res[i].i, i)
                }
            })
        })
    })
})