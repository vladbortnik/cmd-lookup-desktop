import CommandItem from './CommandItem';

/**
 * CommandList component for displaying filtered commands
 * 
 * @param {Object} props - Component props
 * @param {Array} props.commands - Array of filtered commands to display
 * @param {Array} props.allCommands - Array of all available commands
 * @param {string} props.searchQuery - Current search query
 * @param {Set} props.expandedCommands - Set of expanded command keys
 * @param {Function} props.onToggleExpanded - Toggle expanded state handler
 * @returns {JSX.Element} CommandList component
 */
export default function CommandList({ 
  commands, 
  allCommands,
  searchQuery, 
  expandedCommands, 
  onToggleExpanded 
}) {
  if (searchQuery && commands.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No commands found matching "{searchQuery}"</p>
        <p className="text-slate-500 text-sm mt-2">
          Try a different search term or browse all commands
        </p>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Start typing to search commands...</p>
        <p className="text-slate-500 text-sm mt-2">
          Search through {allCommands.length} available commands
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {commands.map((command, index) => {
        const commandKey = `${command.name}-${index}`;
        const isExpanded = expandedCommands.has(commandKey);

        return (
          <CommandItem
            key={commandKey}
            command={command}
            commandKey={index}
            isExpanded={isExpanded}
            onToggleExpanded={onToggleExpanded}
          />
        );
      })}
    </div>
  );
}