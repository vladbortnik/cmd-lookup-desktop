import { useState, useEffect } from 'react';

/**
 * Custom hook for managing command data loading
 * 
 * @param {Array} [mockCommands] - Optional mock commands for testing
 * @returns {Object} { commands, isLoading, error }
 */
export function useCommands(mockCommands) {
  const [commands, setCommands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCommands() {
      try {
        setIsLoading(true);

        if (mockCommands) {
          setCommands(mockCommands);
          setError(null);
          return;
        }

        const module = await import('../data/commands.js');
        setCommands(module.commands || module.default);
        setError(null);
      } catch (err) {
        console.error('Error loading commands:', err);
        setError('Failed to load commands. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadCommands().catch(console.error);
  }, [mockCommands]);

  return { commands, isLoading, error };
}