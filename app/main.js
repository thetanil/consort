const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { env } = require('process')

const createWindow = () => {
    const win = new BrowserWindow({
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
    win.openDevTools();
    if (env.name === 'development') {
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