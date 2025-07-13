import { useEffect } from 'react';

/**
 * Custom hook for managing Electron window resizing
 * 
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {string} searchQuery - Current search query (used as dependency)
 */
export function useWindowResize(containerRef, searchQuery) {
  useEffect(() => {
    if (containerRef.current && window.electronAPI) {
      const observer = new ResizeObserver(() => {
        const height = containerRef.current.offsetHeight;
        window.electronAPI.resizeWindow(600, height);
      });
      
      observer.observe(containerRef.current);
      
      return () => observer.disconnect();
    }
  }, [containerRef, searchQuery]);
}