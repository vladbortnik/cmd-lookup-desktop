/**
 * @fileoverview Test suite for the commands database
 * Validates data structure, properties, and content requirements
 */

import { describe, it, expect } from 'vitest';
import { commands } from './commands.js';

describe('Commands Data Structure', () => {
  it('commands should be an array', () => {
    expect(Array.isArray(commands)).toBe(true);
  });

  it('should have at least 80 commands', () => {
    expect(commands.length).toBeGreaterThanOrEqual(80);
  });

  it('each command should have the required properties', () => {
    commands.forEach((command, index) => {
      // Check that properties exist (not specific values)
      expect(command).toHaveProperty('name');
      expect(command).toHaveProperty('description');
      expect(command).toHaveProperty('platform');
      
      // Type checks
      expect(typeof command.name).toBe('string', `Name for command at index ${index} should be a string`);
      expect(typeof command.description).toBe('string', `Description for ${command.name} should be a string`);
      expect(Array.isArray(command.platform)).toBe(true, `Platform for ${command.name} should be an array`);
      
      // Check if examples exist and are in the right format
      if (command.examples) {
        expect(Array.isArray(command.examples)).toBe(true, `Examples for ${command.name} should be an array`);
      }
    });
  });

  it('commands should be sorted alphabetically by name', () => {
    const names = commands.map(cmd => cmd.name);
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    
    // Commands should be pre-sorted alphabetically
    expect(names).toEqual(sortedNames);
  });

  it('should have unique command names after deduplication', () => {
    const names = commands.map(cmd => cmd.name);
    const uniqueNames = new Set(names);
    
    // Commands are now deduplicated, so unique names should equal total length
    expect(uniqueNames.size).toEqual(names.length);
    expect(uniqueNames.size).toBeGreaterThan(70); // At least 70 unique commands
  });

  it('should have valid platform values', () => {
    const validPlatforms = ['linux', 'mac', 'windows'];
    
    commands.forEach(command => {
      command.platform.forEach(platform => {
        expect(validPlatforms).toContain(platform, `${command.name} has invalid platform: ${platform}`);
      });
    });
  });
});
