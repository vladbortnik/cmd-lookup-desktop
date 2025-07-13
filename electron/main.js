/**
 * Electron Main Process
 * 
 * Minimal main process following Electron 37 best practices:
 * - Window creation and lifecycle
 * - Global shortcuts
 * - Essential IPC (platform detection, window resizing)
 */

import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron';
import { platform } from 'node:process';

// Keep reference to window objects to prevent garbage collection
let mainWindow = null;

/**
 * Create the main application window
 */
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 80,
    minWidth: 400,
    minHeight: 80,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: !app.isPackaged,
      preload: new URL('./preload.js', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:')
    },
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
  });

  // Set Content Security Policy for development
  if (!app.isPackaged) {
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:* data: blob:;"
          ]
        }
      });
    });
  }

  // Load React app
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile('dist/index.html');
  }

  // Window event handlers
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = null; });
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') mainWindow.hide();
  });
}


/**
 * Setup essential IPC handlers
 */
function setupIPC() {
  // Window resize with screen constraints
  ipcMain.on('resize-window', (event, { height }) => {
    if (!mainWindow) return;
    
    const [currentWidth, currentHeight] = mainWindow.getSize();
    const [currentX, currentY] = mainWindow.getPosition();
    const { height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
    const maxHeight = Math.floor(screenHeight * 0.8);
    const newHeight = Math.max(80, Math.min(height, maxHeight));
    
    // Keep window vertically centered
    const heightDiff = newHeight - currentHeight;
    const newY = Math.max(0, currentY - Math.floor(heightDiff / 2));
    
    mainWindow.setBounds({
      x: currentX,
      y: newY,
      width: currentWidth,
      height: newHeight
    });
  });

  // Platform detection
  ipcMain.handle('get-platform', () => platform);
}

/**
 * Register global shortcuts
 */
function registerGlobalShortcuts() {
  globalShortcut.register('Option+Command+Space', () => {
    if (!mainWindow) return;
    
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  console.log('Global shortcut registered: Option+Cmd+Space');
}

/**
 * App lifecycle
 */
app.whenReady().then(() => {
  createMainWindow();
  registerGlobalShortcuts();
  setupIPC();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    console.log('Blocked new window creation:', navigationUrl);
  });
});