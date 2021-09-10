import { app, BrowserWindow, ipcMain } from 'electron'
import '../renderer/store'

// 引入 express 服务端
import '../plugins/express'

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`


/**
 * 定义所有窗口
 */
let allWindow = [
    {
        path: 'index',
        name: 'index',
        width: 300,
        height: 500,
        frame: false,
        transparent: true,
        parent: true
    },
    {
        path: 'barrage',
        name: 'barrage',
        width: 300,
        height: 412,
        frame: false,
        transparent: true,
    },
    {
        path: 'focus',
        name: 'focus',
        width: 300,
        height: 412,
        frame: false,
        transparent: true,
    },
    {
        path: 'welcome',
        name: 'welcome',
        width: 1300,
        height: 500,
        frame: false,
        transparent: true,
    },
    {
        path: 'music',
        name: 'music',
        width: 330,
        // width: 1400,
        height: 500,
        frame: false,
        transparent: true,
    }
]

/**
 * 初始化所有窗口
 */
allWindow.forEach(item => {
    item.name = () => {
        item.name = new BrowserWindow({
            width: item.width,
            height: item.height,
            parent: item.parent ? '' : item.path,
            frame: item.frame,
            transparent: item.transparent
        })
        item.name.loadURL(winURL + '/#/' + item.path);
        item.name.setMaximizable(false)
    }
})

/**
 * 实例化窗口
 */
let slhWin = (data) => {
    data.name = () => {
        data.name = new BrowserWindow({
            width: data.width,
            height: data.height,
            parent: data.parent ? '' : data.path,
            frame: data.frame,
            transparent: data.transparent
        })
        data.name.loadURL(winURL + '/#/' + data.path);
        data.name.setMaximizable(false)
    }
    data.name()
}


/**
 * 打开窗口
 */
ipcMain.on('openWindows', (e, path) => {
    allWindow.forEach(item => {
        if (item.path == path) {
            if (typeof (item.name) != 'function') {
                slhWin(item)
            } else {
                item.name()
            }
        }
    })
});

/**
 * 最小化窗口
 */
ipcMain.on('window-mini', () => {
    allWindow[0].name.minimize();
})

/**
 * 关闭窗口
 */
ipcMain.on('window-close', (e, path) => {
    if (path == 'index') {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    } else {
        allWindow.forEach(item => {
            if (item.path == path) {
                item.name.close()
            }
        })
    }

});


/**
 * 窗口锁定
 */
ipcMain.on('window-lock', (e, path) => {
    allWindow.forEach(item => {
        if (item.path == path) {
            if (item.name.isMovable()) {
                item.name.setMovable(false)
            } else {
                item.name.setMovable(true)
            }
        }
    })
});



// 窗口置顶
ipcMain.on('window-top', (e, path) => {
    allWindow.forEach(item => {
        if (item.path == path) {
            if (item.name.isAlwaysOnTop()) {
                item.name.setAlwaysOnTop(false);
            } else {
                item.name.setAlwaysOnTop(true);
            }
        }
    })
});

app.on('ready', allWindow[0].name)