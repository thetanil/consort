"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const electron_2 = __importDefault(require("electron"));
class Main {
    static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.app.quit();
        }
    }
    static onReady() {
        let displays = electron_2.default.screen.getAllDisplays();
        let displayMonitor = displays[displays.length - 1];
        Main.mainWindow = new electron_1.BrowserWindow({
            x: displayMonitor.bounds.x,
            y: displayMonitor.bounds.y,
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                // enableRemoteModule: false, // turn off remote
                preload: path_1.default.join(__dirname, "../preload.js") // use a preload script
            }
        });
        Main.mainWindow.webContents.openDevTools({ mode: 'detach' });
        Main.mainWindow.loadFile('../mocha.html');
    }
    static main(app) {
        Main.app = app;
        Main.app.on('window-all-closed', Main.onWindowAllClosed);
        Main.app.on('ready', Main.onReady);
    }
}
exports.default = Main;
// import { play } from './play';
// import { EventEmitter } from 'events';
// // import Calculator from './calculator';
// // import { test } from 'test/test.ts'
// class Database extends EventEmitter {
//    constructor() {
//        super();
//         this.emit('ready');
//     }
//}
//new Database();
//export namespace ss {
//     { play }
// }
//# sourceMappingURL=Main.js.map