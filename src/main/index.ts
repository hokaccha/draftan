import { join } from "path";
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { initMenu } from "./menu";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  initMenu();

  await prepareNext({
    development: join(__dirname, "../../src/renderer"),
    production: join(__dirname, "../renderer"),
  });

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev ? "http://localhost:8000/" : `file://${join(__dirname, "../renderer/index.html")}`;

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
