import { app, Menu } from "electron";
import type { MenuItemConstructorOptions } from "electron";

const template: MenuItemConstructorOptions[] = [
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "selectAll" },
      {
        label: "Copy All",
        accelerator: "CmdOrCtrl+Shift+C",
        click(_item, focusedWindow): void {
          focusedWindow?.webContents.send("copy");
        },
      },
      {
        label: "Clear",
        accelerator: "CmdOrCtrl+L",
        click(_item, focusedWindow): void {
          focusedWindow?.webContents.send("clear");
        },
      },
    ],
  },
  {
    label: "View",
    submenu: [{ role: "reload" }, { role: "togglefullscreen" }, { role: "toggleDevTools" }],
  },
  {
    label: "Window",
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }],
  },
];

if (process.platform === "darwin") {
  template.unshift({
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  });
}

export function initMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
