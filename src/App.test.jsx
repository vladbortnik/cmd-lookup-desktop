/**
 * @fileoverview Comprehensive test suite for the TL;DR App component
 * Tests search functionality, command display, error handling, and user interactions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

/**
 * Mock command data for testing
 * Includes commands with different properties to test various scenarios
 */
const mockCommands = [
  {
    name: 'test-cmd',
    standsFor: 'testing command',
    description: 'A command for testing',
    examples: ['test-cmd -a  # Option a', 'test-cmd -b  # Option b'],
    platform: ['linux', 'mac'],
    category: 'testing'
  },
  {
    name: 'another-cmd',
    standsFor: 'another command',
    description: 'Another command for testing',
    examples: ['another-cmd -x  # Option x', 'another-cmd -y  # Option y'],
    platform: ['linux'],
    category: 'utilities'
  }
];

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Reset console mock
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('renders the header correctly', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Check for header elements
    expect(screen.getByText('TL;DR Commands')).toBeInTheDocument();
    expect(screen.getByText('Simplified command reference for developers')).toBeInTheDocument();
    
    // Check for search box
    expect(screen.getByPlaceholderText('Search commands...')).toBeInTheDocument();
  });

  it('loads and displays commands', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Check that commands are displayed
    expect(screen.getByText('test-cmd')).toBeInTheDocument();
    expect(screen.getByText('testing command')).toBeInTheDocument();
    expect(screen.getByText('A command for testing')).toBeInTheDocument();
    
    expect(screen.getByText('another-cmd')).toBeInTheDocument();
  });

  it('filters commands based on search query', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Enter search query
    const searchInput = screen.getByPlaceholderText('Search commands...');
    fireEvent.change(searchInput, { target: { value: 'another' } });
    
    // Check that only matching commands are displayed
    await waitFor(() => {
      expect(screen.getByText('1 found')).toBeInTheDocument();
    });
    
    expect(screen.getByText('another-cmd')).toBeInTheDocument();
    expect(screen.queryByText('test-cmd')).not.toBeInTheDocument();
  });

  it('shows appropriate message when no commands match search', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Enter search query that won't match anything
    const searchInput = screen.getByPlaceholderText('Search commands...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    // Check that no commands are displayed
    await waitFor(() => {
      expect(screen.getByText('0 found')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('test-cmd')).not.toBeInTheDocument();
    expect(screen.queryByText('another-cmd')).not.toBeInTheDocument();
  });

  it('performs case-insensitive search', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Enter uppercase search query
    const searchInput = screen.getByPlaceholderText('Search commands...');
    fireEvent.change(searchInput, { target: { value: 'TEST' } });
    
    // "TEST" matches both commands: test-cmd by name and another-cmd by description ("testing")
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    expect(screen.getByText('test-cmd')).toBeInTheDocument();
    expect(screen.getByText('another-cmd')).toBeInTheDocument();
  });

  it('displays command details correctly', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Check examples are displayed
    expect(screen.getByText('test-cmd -a')).toBeInTheDocument();
    expect(screen.getByText('test-cmd -b')).toBeInTheDocument();
    // Check that example comments are present
    expect(screen.getByText((content) => content.includes('Option a'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Option b'))).toBeInTheDocument();
    
    // Check platforms are displayed (using getAllByText since linux appears multiple times)
    expect(screen.getAllByText('linux').length).toBeGreaterThan(0);
    expect(screen.getByText('mac')).toBeInTheDocument();
    
    // Check categories are displayed
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('utilities')).toBeInTheDocument();
  });

  it('shows loading state initially', async () => {
    // Don't pass mockCommands to actually trigger the loading state
    render(<App />);
    
    // Loading state should be visible briefly
    expect(screen.getByText('Loading commands...')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading commands...')).not.toBeInTheDocument();
    });
  });

  it('resets search results when search query is cleared', async () => {
    render(<App mockCommands={mockCommands} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
    
    // Enter search query
    const searchInput = screen.getByPlaceholderText('Search commands...');
    fireEvent.change(searchInput, { target: { value: 'another' } });
    
    // Check filtered results
    await waitFor(() => {
      expect(screen.getByText('1 found')).toBeInTheDocument();
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    // Check all commands are shown again
    await waitFor(() => {
      expect(screen.getByText('2 found')).toBeInTheDocument();
    });
  });

  it('handles commands without standsFor field', async () => {
    const commandsWithoutStandsFor = [
      {
        name: 'no-stands-for',
        description: 'A command without standsFor field',
        platform: ['linux'],
        category: 'test'
      }
    ];
    
    render(<App mockCommands={commandsWithoutStandsFor} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('1 found')).toBeInTheDocument();
    });
    
    // Should display command without standsFor
    expect(screen.getByText('no-stands-for')).toBeInTheDocument();
    expect(screen.getByText('A command without standsFor field')).toBeInTheDocument();
  });

  it('handles commands without examples', async () => {
    const commandsWithoutExamples = [
      {
        name: 'no-examples',
        description: 'A command without examples',
        platform: ['linux'],
        category: 'test'
      }
    ];
    
    render(<App mockCommands={commandsWithoutExamples} />);
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByText('1 found')).toBeInTheDocument();
    });
    
    // Should display command without examples section
    expect(screen.getByText('no-examples')).toBeInTheDocument();
    expect(screen.getByText('A command without examples')).toBeInTheDocument();
    // The $ symbol appears in the header logo, so we need to be more specific
    // Check that there's no examples section by looking for the examples container
    const commandCard = screen.getByText('no-examples').closest('.bg-slate-800');
    expect(commandCard.querySelector('.bg-slate-900')).toBeNull();
  });
});