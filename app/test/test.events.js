// const assert = require("chai/lib/chai/interface/assert")

// const assert = require("chai/lib/chai/interface/assert")

// const createP = () => {
//     let top = document.body.firstChild()
//     let node = document.createElement('p')
//     node.appendChild(document.createTextNode('now a p'))
//     node.insertBefore(top)
// }

const createTestEl = (elType = 'div', id = "no-id-given") => {
    const body = document.body
    const el = document.createElement(elType)
    el.setAttribute('id', id)
    el.appendChild(document.createTextNode(`a ${elType}`))
    body.append(el)
    return el
}

describe("ipc", () => {
    describe("#event-reply", () => {

        it("should reply", async () => {
            let result = api.send('event-reply', { "event": 'reply' })
            await result.then((res) => {
                console.log(`event-reply:res: ${JSON.stringify(res)}`)
                assert.equal(res.event, 'reply')
            })
        })
    })

    describe("#replace-content", () => {
        it('should update content', (done) => {
            let channel = 'replace-content'
            let id = `${channel}-test`
            let el = createTestEl('p', id)
            assert.equal(el.tagName, 'P')

            const obs = new MutationObserver((mut, obs) => {
                assert.equal(el.firstChild.tagName, 'BUTTON')
                done()
            })
            obs.observe(el, { childList: true })

            let html = `<button>now a button</button>`
            api.send(channel, { selector: id, html })
        })

    })
})
