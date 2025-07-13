/**
 * Electron Main Process
 * 
 * This is the "brain" of the desktop app. It:
 * - Creates and manages windows
 * - Registers global shortcuts  
 * - Handles app lifecycle (startup, quit)
 * - Provides secure bridge to React app
 */

/**
 * Legacy CommonJS Standard:
 *
 * const { app, BrowserWindow, globalShortcut } = require('electron');
 * const path = require('path');
 */

import { app, BrowserWindow, globalShortcut, ipcMain, screen } from 'electron';
import { platform } from 'node:process';

// Keep reference to window objects to prevent garbage collection
let mainWindow = null;

/**
 * Create the main application window
 */
function createMainWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 80, // Start compact - will resize dynamically
    minWidth: 400,
    minHeight: 80,
    webPreferences: {
      // Security: Enable context isolation and disable node integration
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      // Preload script for secure communication  
      preload: new URL('./preload.js', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:')
    },
    // UI preferences
    show: false, // Don't show until ready
    frame: false, // Remove title bar completely
    transparent: true, // Allow custom styling
    alwaysOnTop: true, // Stay above other windows
    skipTaskbar: true, // Don't show in taskbar/dock
  });

  // Load the React app
  const isDev = !app.isPackaged;
  
  if (isDev) {
    // Development: Load from Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools in detached window for debugging
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    // Production: Load built React app
    mainWindow.loadFile('dist/index.html');
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Hide window when it loses focus (blur)
  // mainWindow.on('blur', () => {
  //   mainWindow.hide();
  // });

  // Handle ESC key to hide window
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      mainWindow.hide();
    }
  });
}


/**
 * Setup IPC handlers for window communication
 */
function setupIPC() {
  // Handle window resize requests from React app
  ipcMain.on('resize-window', (event, { height }) => {
    if (mainWindow) {
      const [currentWidth, currentHeight] = mainWindow.getSize();
      const [currentX, currentY] = mainWindow.getPosition();
      const { height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
      const maxHeight = Math.floor(screenHeight * 0.8); // 80% of screen height
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
    }
  });

  // Handle platform information requests
  ipcMain.handle('get-platform', () => {
    return platform;
  });

}

/**
 * Register global keyboard shortcuts
 */
function registerGlobalShortcuts() {
  // Primary shortcut to show/hide the app
  globalShortcut.register('Option+Command+Space', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  console.log('Global shortcut registered: Option+Cmd+Space');
}

/**
 * App Event Handlers
 */

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createMainWindow();
  registerGlobalShortcuts();
  setupIPC();

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  // On macOS, apps typically stay active until explicitly quit
  if (platform !== 'darwin') {
    app.quit();
  }
});

// Clean up global shortcuts when app is quitting
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Security: Prevent new window creation from renderer process
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // Prevent opening new windows from web content
    event.preventDefault();
    console.log('Blocked new window creation:', navigationUrl);
  });
});