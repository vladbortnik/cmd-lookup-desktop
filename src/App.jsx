import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp, FiTerminal } from "react-icons/fi";
import "./index.css";

/**
 * Main TL;DR application component that displays a searchable command reference.
 * Features fuzzy search, expandable examples, and responsive design.
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.mockCommands] - Optional mock commands for testing
 * @returns {JSX.Element} The main application component
 */
function App({ mockCommands }) {
  const [commands, setCommands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [expandedCommands, setExpandedCommands] = useState(() => new Set());
  const containerRef = useRef(null);
  

  useEffect(() => {
    /**
     * Asynchronously loads command data from the data module or uses mock data for testing.
     * Handles loading states and error conditions.
     */
    async function loadCommands() {
      try {
        setIsLoading(true);

        if (mockCommands) {
          setCommands(mockCommands);
          setError(null);
          return;
        }

        const module = await import("./data/commands.js");
        setCommands(module.commands || module.default);
        setError(null);
      } catch (err) {
        console.error("Error loading commands:", err);
        setError("Failed to load commands. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCommands().catch(console.error);
  }, [mockCommands]);


  // Dynamic window resizing based on content
  useEffect(() => {
    if (containerRef.current && window.electronAPI) {
      const observer = new ResizeObserver(() => {
        const height = containerRef.current.scrollHeight + 20; // Add padding
        window.electronAPI.resizeWindow(600, height);
      });
      
      observer.observe(containerRef.current);
      
      return () => observer.disconnect();
    }
  }, [searchQuery]);

  /**
   * Enhanced fuzzy search algorithm that matches characters in sequence
   * with bonus scoring for consecutive matches and substring matches.
   * 
   * @param {string} searchTerm - The search query to match against
   * @param {string} targetString - The target string to search within
   * @returns {number} Match score (0 for no match, higher numbers for better matches)
   */
  const fuzzySearch = (searchTerm, targetString) => {
    const search = searchTerm.toLowerCase();
    const target = targetString.toLowerCase();
    
    // Exact match gets highest score
    if (target.includes(search)) {
      return 100 - (target.length - search.length);
    }
    
    // Fuzzy matching: check if all characters from search appear in order in target
    let searchIndex = 0;
    let score = 0;
    let consecutiveMatches = 0;
    
    for (let i = 0; i < target.length && searchIndex < search.length; i++) {
      if (target[i] === search[searchIndex]) {
        searchIndex++;
        consecutiveMatches++;
        score += consecutiveMatches * 2; // Bonus for consecutive matches
      } else {
        consecutiveMatches = 0;
      }
    }
    
    // If we matched all search characters, return a score based on match quality
    if (searchIndex === search.length) {
      const matchRatio = search.length / target.length;
      return Math.floor(score * matchRatio * 10);
    }
    
    return 0; // No match
  };

  /**
   * Searches a command by both name and description, with improved logic for short queries.
   * 
   * @param {string} searchTerm - The search query
   * @param {Object} command - Command object with name and description properties
   * @returns {number} Combined search score with name matches getting priority
   */
  const searchCommand = (searchTerm, command) => {
    const nameScore = fuzzySearch(searchTerm, command.name);
    const descriptionScore = fuzzySearch(searchTerm, command.description);
    
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
    } else if (descriptionScore > 40) { // Even higher threshold
      return descriptionScore;
    }
    
    return 0; // No match
  };

  /**
   * Filter and rank commands based on search query using fuzzy search.
   * Returns all commands if no search query, otherwise returns filtered and sorted results.
   */
  let displayCommands;

  if (searchQuery.trim() === "") {
    displayCommands = commands.slice();
  } else {
    const query = searchQuery.toLowerCase();

    const scoredCommands = commands.map((command) => ({
      ...command,
      score: searchCommand(query, command)
    }));

    const matched = scoredCommands
      .filter((command) => command.score > 0)
      .sort((a, b) => b.score - a.score);

    const uniqueMatches = {};
    displayCommands = matched.filter((command) => {
      if (!uniqueMatches[command.name]) {
        uniqueMatches[command.name] = true;
        return true;
      }
      return false;
    });
  }

  if (import.meta.env.MODE === 'development') {
    console.log(
      `Search: "${searchQuery}", Found: ${displayCommands.length} commands`
    );
    console.log(
      "Displaying:",
      displayCommands.map((cmd) => cmd.name)
    );
  }

  /**
   * Toggles the expanded state of a command's examples section.
   * 
   * @param {string} commandName - Name of the command
   * @param {number} index - Index of the command in the display list
   */
  const toggleExpanded = (commandName, index) => {
    const key = `${commandName}-${index}`;
    const newExpanded = new Set(expandedCommands);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCommands(newExpanded);
  };



  return (
    // <div ref={containerRef} className="bg-slate-900 text-white rounded-lg shadow-2xl overflow-hidden">
      <div ref={containerRef} className="bg-slate-900 text-white rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Desktop: Compact search bar with logo on same line */}
        {/*<div className="flex items-center gap-3 mb-4">*/}
        <div className="flex items-center gap-3">
        {/* Search Input */}
          <input
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 text-base bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            autoFocus
          />


          {/* TL;DR Logo - moved to right */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 border-2 border-blue-500/30 rounded-xl h-12 px-4 shadow-xl flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
            <div className="relative flex items-center gap-2 h-full">
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-md flex items-center justify-center shadow-lg">
                  <FiTerminal className="text-white text-sm" style={{strokeWidth: 2.5}} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-md opacity-30 animate-ping"></div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  TL
                </span>
                <span className="text-cyan-400 text-sm font-light mx-0.5">;</span>
                <span className="text-lg font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DR
                </span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl border border-blue-400/20 animate-pulse"></div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-3 mb-4 rounded-r-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-slate-400 text-sm">Loading...</p>
          </div>
        ) : (
          searchQuery.trim() ? (
            <div>
              {/* Results count */}
              <p className="mb-3 text-xs text-slate-500">
                {displayCommands.length} found
              </p>

            {/* Command list - compact for desktop */}
            <div className="space-y-2" key={`search-results-${searchQuery}`}>
              {displayCommands.map((command, index) => {
                const commandKey = `${command.name}-${index}`;
                const isExpanded = expandedCommands.has(commandKey);
                const hasExamples = command.examples && command.examples.length > 0;
                const visibleExamples = hasExamples ? 
                  (isExpanded ? command.examples : command.examples.slice(0, 2)) : [];
                const hasMoreExamples = hasExamples && command.examples.length > 2;
                
                return (
                  <div
                    key={commandKey}
                    className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-blue-400 mb-1">
                            {command.name}
                          </h3>
                        </div>
                        {command.standsFor && (
                          <p className="text-xs text-slate-500 italic mb-1">
                            {command.standsFor}
                          </p>
                        )}
                        <p className="text-slate-300 text-sm mb-2">{command.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-3">
                        {command.platform &&
                          command.platform.length > 0 &&
                          command.platform.slice(0, 2).map((platform) => (
                            <span
                              key={platform}
                              className="bg-blue-500/20 text-blue-300 text-xs px-1.5 py-0.5 rounded"
                            >
                              {platform}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Display examples if available */}
                    {hasExamples && (
                      <div className="mt-4">
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                          {visibleExamples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="flex items-start space-x-3 mb-2 last:mb-0">
                              <span className="text-emerald-400 font-mono text-sm mt-0.5">$</span>
                              <code className="text-sm font-mono text-slate-300 flex-1">
                                {example.split(' # ')[0]}
                                {example.includes(' # ') && (
                                  <span className="text-slate-500 ml-2">
                                    # {example.split(' # ')[1]}
                                  </span>
                                )}
                              </code>
                            </div>
                          ))}
                          
                          {hasMoreExamples && (
                            <button
                              onClick={() => toggleExpanded(command.name, index)}
                              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm mt-3 transition-colors duration-200"
                            >
                              {isExpanded ? (
                                <>
                                  <FiChevronUp className="w-4 h-4" />
                                  <span>Show less</span>
                                </>
                              ) : (
                                <>
                                  <FiChevronDown className="w-4 h-4" />
                                  <span>+{command.examples.length - 2} more</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default App;
