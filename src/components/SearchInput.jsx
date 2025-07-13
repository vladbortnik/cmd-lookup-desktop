import { useEffect, useRef } from 'react';

/**
 * SearchInput component with autofocus functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Change handler function
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} SearchInput component
 */
export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search commands...", 
  className = ""
}) {
  const inputRef = useRef(null);

  // Autofocus when component mounts or becomes visible
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Re-focus when window regains focus (for Electron)
  useEffect(() => {
    const handleWindowFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-primary ${className}`}
      autoFocus
    />
  );
}