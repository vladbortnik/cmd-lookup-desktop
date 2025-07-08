import { useState, useEffect } from "react";
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
    
    // For short queries (1-2 characters), prioritize exact name matches heavily
    if (searchTerm.length <= 2) {
      if (command.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return nameScore + 2000; // Very high score for exact substring in name
      }
      // For short queries, only allow high-scoring fuzzy matches in descriptions
      if (descriptionScore > 50) {
        return descriptionScore;
      }
      return 0;
    }
    
    // For longer queries, use the original logic but be more selective
    if (nameScore > 0) {
      return nameScore + 1000; // Boost name matches significantly
    } else if (descriptionScore > 30) { // Higher threshold for description matches
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
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl text-white font-bold animate-bounce">$</span>
              <div className="absolute inset-0 rounded-2xl animate-pulse bg-green-400 opacity-30"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TL;DR Commands
          </h1>
          <p className="text-xl text-slate-400">Simplified command reference for developers</p>
        </header>

        {/* Search box with logo */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 text-lg bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            {/* TL;DR Logo moved here */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 border-2 border-blue-500/30 rounded-2xl h-16 px-6 shadow-2xl">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
              
              {/* Main content */}
              <div className="relative flex items-center gap-4 h-full">
                {/* Enhanced terminal icon */}
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <FiTerminal className="text-white text-lg" style={{strokeWidth: 2.5}} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg opacity-30 animate-ping"></div>
                </div>
                
                {/* Modern typography */}
                <div className="flex items-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                    TL
                  </span>
                  <span className="text-cyan-400 text-xl font-light mx-1">;</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DR
                  </span>
                </div>
              </div>
              
              {/* Subtle animated border */}
              <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4 mb-6 rounded-r-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center p-8">
            <p className="text-slate-400">Loading commands...</p>
          </div>
        ) : (
          <div>
            {/* Results count */}
            <p className="mb-6 text-sm text-slate-400">
              {displayCommands.length} found
            </p>

            {/* Command list - with key to force re-render on search */}
            <div className="space-y-4" key={`search-results-${searchQuery}`}>
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
                    className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-blue-400 mb-1">
                          {command.name}
                        </h2>
                        {/* Display standsFor if available */}
                        {command.standsFor && (
                          <p className="text-sm text-slate-500 italic mb-2">
                            {command.standsFor}
                          </p>
                        )}
                        <p className="text-slate-300 mb-4">{command.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {/* Display platforms/categories */}
                        {command.platform &&
                          command.platform.length > 0 &&
                          command.platform.map((platform) => (
                            <span
                              key={platform}
                              className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full"
                            >
                              {platform}
                            </span>
                          ))}
                        {command.category && (
                          <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full">
                            {command.category}
                          </span>
                        )}
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
        )}
      </div>
    </div>
  );
}

export default App;
