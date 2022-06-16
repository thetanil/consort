
describe("sqlite", () => {
    describe("#success", () => {
        it('should be true', async () => {
            let res = await api.send('success')
            assert.equal(res, true)
        })
    })
    describe("#get", () => {
        it('should get a row', async () => {
            let sql = 'select 1;'
            let res = await api.send('sqlite-get', { sql })
            assert.deepEqual(res, { '1': 1 })
        })
    })
    describe("#exec", () => {
        it('should execute sql', async () => {
            let tname = 'test_table'
            await api.send('sqlite-exec', { sql: 'DROP TABLE IF EXISTS ' + tname })
            await api.send('sqlite-exec', { sql: 'CREATE TABLE ' + tname + ' (col TEXT)' })
            let res = await api.send('sqlite-get', {
                sql:
                    'SELECT name FROM sqlite_schema WHERE type="table" AND name LIKE "' + tname + '"'
            })
            assert.equal(res.name, tname)
        })
    })
    describe('#insert-node', () => {
        it('should have a nodes table', async () => {
            let tname = 'nodes'
            let res = await api.send('sqlite-get', {
                sql:
                    'SELECT name FROM sqlite_schema WHERE type="table" AND name LIKE "' + tname + '"'
            })
            assert.equal(res.name, tname)
        })
        it('should insert one node', async () => {
            let ins = await api.send('insert-node', { 'asd': 'zxc' })
            assert.equal(ins.changes, 1)
        })
        it('should error if it has an id')
        it('should error if it fails')
    })
})

