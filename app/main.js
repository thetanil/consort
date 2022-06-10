const path = require('path')
const { env } = require('process')
require('dotenv').config()
const electron = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')

const services = require('./services.js')


const createWindow = () => {
    let displays = electron.screen.getAllDisplays()
    let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    })

    const win = new BrowserWindow({
        x: externalDisplay.bounds.x + 50,
        y: externalDisplay.bounds.y + 50,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        }
    })

    if (env.CONSORT_ENV === 'development') {
        win.loadFile(path.join('app', 'mocha.html'))
        // win.openDevTools();
        // console.log(env)
    } else {
        win.loadFile(path.join('app', 'index.html'))
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


const registerServices = (services /*: Record<string, Service> */) => {
    Object.entries(services).forEach(([key, service]) => {
        console.log(`registered ${key}`)
        ipcMain.handle(`${key}`, async (event, ...arg) => {
            return await service(...arg)
                .then((data) => ({ success: true, data, msg: '' }))
                .catch((err) => {
                    console.log(err);
                    return {
                        success: false,
                        data: null,
                        msg: err.message || err,
                    };
                });
        });
    });
};

// console.dir(services)
registerServices(services);
// console.log('services done')