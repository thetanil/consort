import path from 'path'
import { BrowserWindow } from 'electron'
import electron from 'electron';

export default class Main {
    static mainWindow: BrowserWindow; // Electron.BrowserWindow;
    static app: Electron.App;
    static blogWindow: any;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.app.quit()
        }
    }

    private static onReady() {
        let displays = electron.screen.getAllDisplays()

        let displayMonitor = displays[displays.length - 1]

        Main.mainWindow = new BrowserWindow({
            x: displayMonitor.bounds.x,
            y: displayMonitor.bounds.y,
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false, // is default value after Electron v5
                contextIsolation: true, // protect against prototype pollution
                // enableRemoteModule: false, // turn off remote
                preload: path.join(__dirname, "../preload.js") // use a preload script
            }
        })
        Main.mainWindow.webContents.openDevTools({ mode: 'detach' });
        Main.mainWindow.loadFile('../mocha.html')
    }


    static main(app: Electron.App) {
        Main.app = app
        Main.app.on('window-all-closed', Main.onWindowAllClosed)
        Main.app.on('ready', Main.onReady)
    }
}


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
