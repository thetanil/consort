import { BrowserWindow } from "electron";

export default {
  label: "Development",
  submenu: [
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    },
    {
      label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    },
    {
      label: "Toggle FullScreen",
      accelerator: "F11",
      click: () => {
        BrowserWindow.getFocusedWindow()
          .setFullScreen(!BrowserWindow.getFocusedWindow().isFullScreen());
      }
    }
  ]
};
