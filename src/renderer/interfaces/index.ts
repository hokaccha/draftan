// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRenderer } from "electron";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
    }
  }
}
