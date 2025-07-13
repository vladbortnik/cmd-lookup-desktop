import { FiChevronDown, FiChevronUp } from "react-icons/fi";

/**
 * CommandItem component displaying individual command information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.command - Command object
 * @param {string} props.commandKey - Unique key for this command
 * @param {boolean} props.isExpanded - Whether examples are expanded
 * @param {Function} props.onToggleExpanded - Toggle expanded state handler
 * @returns {JSX.Element} CommandItem component
 */
export default function CommandItem({ 
  command, 
  commandKey, 
  isExpanded, 
  onToggleExpanded 
}) {
  const hasExamples = command.examples && command.examples.length > 0;
  const visibleExamples = hasExamples ? 
    (isExpanded ? command.examples : command.examples.slice(0, 2)) : [];
  const hasMoreExamples = hasExamples && command.examples.length > 2;

  return (
    <div className="card-primary cursor-pointer">
      <div className="layout-command-header">
        <div className="layout-command-content">
          <div className="flex items-center gap-2">
            <h3 className="text-command-name">
              {command.name}
            </h3>
          </div>
          {command.standsFor && (
            <p className="text-command-stands-for">
              {command.standsFor}
            </p>
          )}
          <p className="text-command-description">{command.description}</p>
        </div>
        <div className="layout-platform-badges">
          {command.platform &&
            command.platform.length > 0 &&
            command.platform.slice(0, 2).map((platform) => (
              <span
                key={platform}
                className="badge-platform"
              >
                {platform}
              </span>
            ))}
        </div>
      </div>

      {hasExamples && (
        <div className="mt-3">
          <div className="space-y-2">
            {visibleExamples.map((example, exampleIndex) => {
              // Parse example string format: "command # description"
              const parts = example.split(' # ');
              const commandPart = parts[0] || example;
              const descriptionPart = parts[1] || '';
              
              return (
                <div
                  key={exampleIndex}
                  className="card-secondary"
                >
                  <div className="text-command-prompt">
                    $ {commandPart}
                  </div>
                  {descriptionPart && (
                    <div className="text-command-example">
                      {descriptionPart}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {hasMoreExamples && (
            <button
              onClick={() => onToggleExpanded(command.name, commandKey)}
              className="btn-secondary mt-3"
            >
              {isExpanded ? (
                <>
                  <FiChevronUp size={16} />
                  <span>Show less</span>
                </>
              ) : (
                <>
                  <FiChevronDown size={16} />
                  <span>Show {command.examples.length - 2} more examples</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}