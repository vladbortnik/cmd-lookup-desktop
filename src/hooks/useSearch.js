import { useState, useMemo } from 'react';

/**
 * Enhanced fuzzy search algorithm that matches characters in sequence
 * with bonus scoring for consecutive matches and substring matches.
 * 
 * @param {string} searchTerm - The search query to match against
 * @param {string} targetString - The target string to search within
 * @returns {number} Match score (0 for no match, higher numbers for better matches)
 */
function fuzzySearch(searchTerm, targetString) {
  const search = searchTerm.toLowerCase();
  const target = targetString.toLowerCase();
  
  // Exact match gets highest score
  if (target.includes(search)) {
    return 100 - (target.length - search.length);
  }
  
  // Short queries need stricter matching
  if (search.length <= 2) {
    return target.startsWith(search) ? 50 : 0;
  }
  
  // Fuzzy matching for longer queries
  let searchIndex = 0;
  let score = 0;
  let consecutiveMatches = 0;
  
  for (let i = 0; i < target.length && searchIndex < search.length; i++) {
    if (target[i] === search[searchIndex]) {
      searchIndex++;
      consecutiveMatches++;
      score += 1 + consecutiveMatches; // Bonus for consecutive matches
    } else {
      consecutiveMatches = 0;
    }
  }
  
  // Return score only if all characters were found
  return searchIndex === search.length ? score : 0;
}

/**
 * Search function using exact original algorithm from GitHub
 */
function searchCommand(searchTerm, command) {
  const nameScore = fuzzySearch(searchTerm, command.name);
  const descriptionScore = fuzzySearch(searchTerm, command.description || '');
  
  // For very short queries (1-2 characters), be extremely restrictive
  if (searchTerm.length <= 2) {
    // Only exact substring matches in command names
    if (command.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return nameScore + 2000;
    }
    // No description matches for short queries
    return 0;
  }
  
  // For longer queries, use original logic but be more selective
  if (nameScore > 0) {
    return nameScore + 1000;
  } else if (descriptionScore > 77) { // Higher threshold for description
    return descriptionScore;
  }
  
  return 0; // No match
}

/**
 * Enhanced search function that searches in both name and description
 * 
 * @param {Array} commands - Array of commands to search through
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered and scored commands
 */
function searchCommands(commands, searchQuery) {
  const search = searchQuery.toLowerCase().trim();

  // Score each command using original algorithm
  const scoredCommands = commands.map((command) => ({
    ...command,
    score: searchCommand(search, command),
  }));

  const matched = scoredCommands
    .filter((command) => command.score > 0)
    .sort((a, b) => b.score - a.score);

  // Remove duplicates by name
  const uniqueMatches = {};
  return matched.filter((command) => {
    if (!uniqueMatches[command.name]) {
      uniqueMatches[command.name] = true;
      return true;
    }
    return false;
  });
}

/**
 * Custom hook for managing search functionality
 * 
 * @param {Array} commands - Array of commands to search through
 * @returns {Object} { searchQuery, setSearchQuery, filteredCommands }
 */
export function useSearch(commands) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const results = searchCommands(commands, searchQuery.trim());

    if (import.meta.env.MODE === 'development') {
      console.log(
        `Search: "${searchQuery}", Found: ${results.length} commands`
      );
      console.log(
        "Displaying:",
        results.map((cmd) => cmd.name)
      );
    }

    return results;
  }, [commands, searchQuery]);

  return { searchQuery, setSearchQuery, filteredCommands };
}