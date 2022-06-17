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

const later = (delay, msg) => {
    return new Promise(resolve => setTimeout(() => {
        let x = msg.i * msg.i
        console.log(`${msg.i}:${x}`)
        return resolve({ ...msg, "x": x })
    }, delay));
}

// // test in browser with Array.from({ length: 3 }, (x, i) => { api.doThing({x,i}).then((msg) => console.log(msg)) });
// exports['do-thing'] = async (msg) => {
//     return await later(Math.floor(Math.random() * 10) + 1, msg)
// }

// exports['echo'] = async (msg) => { console.dir(msg); return msg }

// exports.send = async (channel, msg) => {
//     console.dir(channel, msg)
//     switch (channel) {
//         case 'echo':
//             break;
//         case 'do-thing':
//             console.log(`switch`)
//             break;
//         default:
//             console.error('does not understand')
//             console.error(channel, msg)
//     }
// }
