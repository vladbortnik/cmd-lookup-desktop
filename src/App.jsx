import { useState, useRef } from "react";
import "./index.css";

// Components
import Header from "./components/Header";
import LoadingState from "./components/LoadingState";
import CommandList from "./components/CommandList";

// Custom Hooks
import { useCommands } from "./hooks/useCommands";
import { useSearch } from "./hooks/useSearch";
import { useWindowResize } from "./hooks/useWindowResize";

/**
 * Main TL;DR application component - now focused on composition and state management
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.mockCommands] - Optional mock commands for testing
 * @returns {JSX.Element} The main application component
 */
function App({ mockCommands }) {
  const [expandedCommands, setExpandedCommands] = useState(() => new Set());
  const containerRef = useRef(null);

  // Custom hooks for data management
  const { commands, isLoading, error } = useCommands(mockCommands);
  const { searchQuery, setSearchQuery, filteredCommands } = useSearch(commands);
  
  // Electron integration
  useWindowResize(containerRef, searchQuery);

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

  /**
   * Handle search input changes
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div ref={containerRef} className="bg-slate-900 text-white rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Header with search and logo */}
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Content area - only show when there's a search query */}
        {searchQuery && (
          <div className="mt-4">
            <LoadingState isLoading={isLoading} error={error} />
            
            {!isLoading && !error && (
              <>
                {/* Search results count */}
                <div className="mb-4">
                  <p className="text-results-count">
                    Found {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                </div>
                
                <CommandList
                  commands={filteredCommands}
                  allCommands={commands}
                  searchQuery={searchQuery}
                  expandedCommands={expandedCommands}
                  onToggleExpanded={toggleExpanded}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;