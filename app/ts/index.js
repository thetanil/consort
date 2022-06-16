"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
// import Calculator from './calculator';
// import { test } from 'test/test.ts'
class Database extends events_1.EventEmitter {
    constructor() {
        super();
        this.emit('ready');
    }
}
new Database();
