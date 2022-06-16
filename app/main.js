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
        win.loadFile(path.join('app', 'demo.html'))
        // win.openDevTools();
        // console.log(env)
    } else {
        win.loadFile(path.join('app', 'demo.html?print-pdf'))
    }
    // win.webContents.send('sad')
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


ipcMain.handle('do-thing', async (e, msg) => {
    // console.log(`main:do-thing:a: ${a}`)
    // console.dir(a)
    return { ...msg, 'x': msg.i * msg.i }
})

ipcMain.handle('echo', async (e, msg) => {
    console.log(`echo: ${JSON.stringify(msg)}`)
    return msg
})

ipcMain.handle('event-reply', async (e, msg) => {
    console.log(`event-reply: ${JSON.stringify(msg)}`)
    console.log(`event-replay:e.sender: ${JSON.stringify(e.senderId)}`)
    return msg
})

ipcMain.handle('replace-content', async (e, msg) => {
    console.log(`msg.selector ${msg.selector}`)
    console.log(`msg.html ${msg.html}`)
    BrowserWindow.getAllWindows()[0].webContents.send('replace', msg)
})


const register = (api_name) => {
    const api = require(path.join(__dirname, 'api', api_name))
    Object.keys(api).forEach(h => {
        console.log(`register handler: ${h}`)
        ipcMain.handle(h, api[h])
    })
}

register('sqlite')

const util = require('util')
const registerTypeScript = (api_name) => {
    const api = require(path.join(__dirname, 'ts', api_name))
    console.log(`api: ${util.inspect(api.services)}`)
    Object.keys(api.services).forEach(h => {
        console.log(`register handler: ${h}`)
        ipcMain.handle(h, api.services[h])
    })
    // api.Add(1, 2)
    // const nw = new api()
    // console.log(`kl ${kl}`)
    // console.log(`services: ${api.services}`)

}

registerTypeScript('calculator')

// ipcMain.handle('echo', (e, a) => { return e.returnValue = a })
// const registerServices = (services /*: Record<string, Service> */) => {
//     Object.entries(services).forEach(([key, service]) => {
//         console.log(`registered ${ key }`)
//         ipcMain.handle(`${ key }`, async (event, ...arg) => {
//             return await service(...arg)
//                 .then((data) => ({ success: true, data, msg: '' }))
//                 .catch((err) => {
//                     console.log(err);
//                     return {
//                         success: false,
//                         data: null,
//                         msg: err.message || err,
//                     };
//                 });
//         });
//     });
// };

// registerServices(services);
// console.dir(services)
// console.log('services done')