import { FiTerminal } from "react-icons/fi";
import SearchInput from "./SearchInput";

/**
 * Header component containing search input and TL;DR logo
 * 
 * @param {Object} props - Component props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.onSearchChange - Search change handler
 * @returns {JSX.Element} Header component
 */
export default function Header({ searchQuery, onSearchChange }) {
  return (
    <div className="layout-header">
      {/* Search Input */}
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search commands..."
      />

      {/* TL;DR Logo - moved to right */}
      <div className="logo-container">
        <div className="logo-background"></div>
        <div className="relative flex items-center gap-2 h-full">
          <div className="relative">
            <div className="logo-icon-container">
              <FiTerminal className="text-white text-sm" style={{strokeWidth: 2.5}} />
            </div>
            <div className="logo-icon-glow"></div>
          </div>
          <div className="flex items-center">
            <span className="logo-text-primary">TL</span>
            <span className="text-cyan-400 text-sm font-light mx-0.5">;</span>
            <span className="logo-text-secondary">DR</span>
          </div>
        </div>
      </div>
    </div>
  );
}