import { describe, it, expect } from 'vitest';

describe('Example Unit Test', () => {
  it('should pass a simple assertion', () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });

  it('should test string operations', () => {
    const text = 'Hello, Test-Kit!';
    expect(text).toContain('Test-Kit');
  });

  it('should handle arrays', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
  });
});
