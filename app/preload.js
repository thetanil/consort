const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'api',
    {
        doThing: (msg) => ipcRenderer.invoke('doThing', msg),
        selectFolder: (e) => ipcRenderer.invoke('selectFolder', e),
        openFile: (p) => ipcRenderer.invoke('openFile', p),
        testSend: (msg) => ipcRenderer.send(msg),
        testInvoke: (msg) => ipcRenderer.invoke(msg)
    }
)

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

