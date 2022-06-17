const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'api',
    {
        // send: (channel, msg) => ipcRenderer.send(channel, msg),
        send: (channel, msg) => ipcRenderer.invoke(channel, msg)
    }
)

ipcRenderer.on('replace', (e, msg) => {
    document.getElementById(msg.selector).innerHTML = msg.html
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

