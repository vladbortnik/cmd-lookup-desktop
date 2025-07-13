/**
 * Electron Preload Script
 * 
 * Secure bridge between main process and renderer process.
 * Exposes safe APIs for React app to communicate with Electron.
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Expose safe APIs to the renderer process
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Request window resize
   * @param {number} width - New window width
   * @param {number} height - New window height
   */
  resizeWindow: (width, height) => {
    ipcRenderer.send('resize-window', { width, height });
  },

  /**
   * Get platform information
   * @returns {Promise<string>} Current platform via IPC
   */
  getPlatform: () => ipcRenderer.invoke('get-platform'),

});