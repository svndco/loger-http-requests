const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let mainWindow;
let loggerProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // This is needed to use Electron APIs in the renderer process
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle 'start-watching' event from the renderer process
ipcMain.on('start-watching', (event, filePath) => {
  if (loggerProcess) {
    loggerProcess.kill();
  }
  
  loggerProcess = fork(path.join(__dirname, 'logger-httpreq.js'), [filePath]);

  // Forward log messages from the logger process to the renderer process
  loggerProcess.on('message', (msg) => {
    if (msg.type === 'log-message' && mainWindow) {
      mainWindow.webContents.send('log-message', msg.message);
    }
  });

  loggerProcess.on('exit', (code, signal) => {
    console.log(`Logger process exited with code ${code} and signal ${signal}`);
    if (mainWindow) {
      mainWindow.webContents.send('log-message', 'Logger process exited\n');
    }
  });
});

// Handle 'stop-watching' event from the renderer process
ipcMain.on('stop-watching', () => {
  if (loggerProcess) {
    loggerProcess.kill();
    loggerProcess = null;
    if (mainWindow) {
      mainWindow.webContents.send('log-message', 'Stopped watching\n');
    }
  }
});
