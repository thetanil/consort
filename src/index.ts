
import { EventEmitter } from 'events';

// import Calculator from './calculator';

// import { test } from 'test/test.ts'

class Database extends EventEmitter {
    constructor() {
        super();
        this.emit('ready');
    }
}

new Database();