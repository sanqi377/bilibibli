import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'

// 引入 express 服务端
import '../plugins/express'

// 窗口置顶
ipcMain.on('window-top', () => {
    if (mainWindow.isAlwaysOnTop()) {
        mainWindow.setAlwaysOnTop(false);
        BrowserWindow.getFocusedWindow().webContents.send('alwaysOnTop', 'no');
    } else {
        mainWindow.setAlwaysOnTop(true);
        BrowserWindow.getFocusedWindow().webContents.send('alwaysOnTop', 'yes');
    }
});


// 窗口穿透
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})

// 窗口锁定
ipcMain.on('window-lock', () => {
    if (mainWindow.isMovable()) {
        mainWindow.setMovable(false)
    } else {
        mainWindow.setMovable(true)
    }
});

// 窗口高度
ipcMain.on('window-height', (event, height) => {
    mainWindow.setSize(500, height);
});

// 窗口关闭
ipcMain.on('window-close', () => {
    mainWindow.close();
});

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`


function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        frame: false,
        transparent: true,
        // height: 820,
        height: 911,
        useContentSize: true,
        resizable: false,
        webPreferences: { webSecurity: false },
        width: 1650
        // width: 440
    })

    // 双击不可放大缩小
    mainWindow.setMaximizable(false)

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */