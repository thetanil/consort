const { dialog, shell } = require('electron');

exports.selectFolder = async () => {
    const pathRes = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });
    if (!pathRes || pathRes.length === 0) return;
    return pathRes[0].replace(/\\/g, '/');
}

exports.openFile = async (file /*: string*/) => {
    shell.openPath(file);
}

const later = (delay) =>
    new Promise(resolve => setTimeout(resolve, 1000 - (delay * 100), delay));

// test in browser with Array.from({ length: 3 }, (x, i) => { api.doThing({x,i}).then((msg) => console.log(msg)) });
exports.doThing = async (d) => { return later(d.i) }
