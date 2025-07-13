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

  /**
   * Show artifact window
   * @returns {Promise<boolean>} Success status
   */
  showArtifactWindow: () => ipcRenderer.invoke('show-artifact-window'),

  /**
   * Hide artifact window
   * @returns {Promise<boolean>} Success status
   */
  hideArtifactWindow: () => ipcRenderer.invoke('hide-artifact-window'),

  /**
   * Send content to artifact window
   * @param {Object} contentData - Content data to display
   * @returns {Promise<boolean>} Success status
   */
  sendContentToArtifact: (contentData) => ipcRenderer.invoke('send-content-to-artifact', contentData),

  /**
   * Listen for content display events (for artifact window)
   * @param {Function} callback - Callback function to handle content
   */
  onDisplayContent: (callback) => {
    ipcRenderer.on('display-content', (event, contentData) => callback(contentData));
  }
});