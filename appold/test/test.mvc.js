// const assert = require("chai/lib/chai/interface/assert")
// const { ipcRenderer } = require("electron")

const createButton = () => {
    document.getElementById('test').innerHTML = `
    <button id="test-button" type="button">test button</button>
    `
    let btn = document.getElementById('test-button')
}

describe("MvcMessaging", () => {
    describe("#send", () => {
        it("create a button", (done) => {
            createButton()
            let btn = document.getElementById('test-button')
            assert.equal(btn.id, 'test-button')

            let msg = { 'channel': 'asd123' }
            let prom = btn.onclick = () => api.send('echo', msg)
            btn.click()
            prom().then((res) => {
                assert.deepEqual(res, msg)
            }).then(done)
        })
    })
})
