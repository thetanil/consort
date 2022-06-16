describe("Models", () => {
    describe("#loaded", () => {
        it('asd', async () => {
            assert.equal(1, 1)
            let res = await api.send('add', { x: 1, y: 2 })
            assert.equal(res, 3)
        })
    })
})
