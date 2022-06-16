// const crypto = require('crypto')
const util = require('util')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite');
const { ipcMain } = require('electron');

// exports.handlers = []
// exports.handlers['success'] = async () => { return true }
// exports.handlers = [
//     { 'success': async () => { return true } }
// ]
// (async () => {
// let db = open({ filename: ':memory:', driver: sqlite3.Database })
let db = null;

(async function openDb() {
    if (db) return db

    db = await open({
        // filename: ':memory:',
        filename: '.test.db',
        driver: sqlite3.Database
    })
    await db.exec(`
    `)
    await db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
        body TEXT,
        id   TEXT GENERATED ALWAYS AS (json_extract(body, '$.id')) VIRTUAL NOT NULL UNIQUE
    );
    
    CREATE INDEX IF NOT EXISTS id_idx ON nodes(id);
    
    CREATE TABLE IF NOT EXISTS edges (
        source     TEXT,
        target     TEXT,
        properties TEXT,
        UNIQUE(source, target, properties) ON CONFLICT REPLACE,
        FOREIGN KEY(source) REFERENCES nodes(id),
        FOREIGN KEY(target) REFERENCES nodes(id)
    );
    
    CREATE INDEX IF NOT EXISTS source_idx ON edges(source);
    CREATE INDEX IF NOT EXISTS target_idx ON edges(target);
    `)
    return db
})()

exports['success'] = async () => { return true }

exports['sqlite-get'] = async (ev, msg) => {
    return db.get(msg.sql)
}

exports['sqlite-exec'] = async (ev, msg) => {
    return db.exec(msg.sql)
}

const random_id = (length = 32) => {
    // return crypto.createHash('sha256').update(msg).digest('base64')
    return Math.random().toString(16).substr(2, length);
};

// TODO: is there any guarantee of order from json stringify?
// exports['hash'] = async (ev, msg) => {
//     return crypto.createHash('sha256').update(msg).digest('hex')
// }

exports['insert-node'] = async (ev, msg) => {
    if (msg.id) throw new Error('hashit')
    msg.id = random_id()
    const res = await db.run('INSERT INTO nodes VALUES(json(?))', JSON.stringify(msg))
    console.log(`inserted node: ${util.inspect(res)}`)
    return res
}


    // (async () => {
    //     const db = await open({
    //         filename: 'database.db',
    //         driver: sqlite3.Database
    //     })

    //     // await db.exec('DROP TABLE tbl')
    //     // await db.exec('CREATE TABLE tbl (col TEXT)')
    //     // await db.exec('INSERT INTO tbl VALUES ("test")')
    //     const result = await db.exec(schema.sql)

    //     // const result = await db.get('SELECT col FROM tbl WHERE col = ?', 'test')
    //     console.log(result)

    // })()