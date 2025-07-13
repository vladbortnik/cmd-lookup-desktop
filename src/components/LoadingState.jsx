/**
 * LoadingState component for displaying loading and error states
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isLoading - Whether data is loading
 * @param {string|null} props.error - Error message if any
 * @returns {JSX.Element|null} LoadingState component or null
 */
export default function LoadingState({ isLoading, error }) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Loading commands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-2">Error loading commands</p>
        <p className="text-slate-500 text-sm">{error}</p>
      </div>
    );
  }

  return null;
}