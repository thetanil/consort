const path = require('path')
const { env } = require('process')
require('dotenv').config()
const electron = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')


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

    win.loadFile('app/index.html')
    // console.log(env)
    if (env.CONSORT_ENV === 'development') {
        win.openDevTools();
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

// app.on("ready", () => {
//     // setApplicationMenu();
//     // initIpc();

//     const mainWindow = createWindow("main", {
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: false, // is default value after Electron v5
//             contextIsolation: true, // protect against prototype pollution
//             enableRemoteModule: false, // turn off remote
//             preload: path.join(__dirname, "preload.js") // use a preload script
//         }
//     });

//     mainWindow.loadURL(
//         url.format({
//             pathname: path.join(__dirname, "index.html"),
//             // pathname: path.join(__dirname, "reveal/demo.html"),
//             protocol: "file:",
//             slashes: true
//         })
//     );

//     // if (env.name === "development") {
//     //     // mainWindow.setFullScreen(true);
//     //     mainWindow.openDevTools();
//     // }
// });