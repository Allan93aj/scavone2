import toKebabCase from './toKebabCase';

describe('toKebabCase', () => {
  it('should be able to convert to kebab-case', () => {
    const result = toKebabCase('This is a Test');

    expect(result).toBe('this-is-a-test');
  });

  it('should be able to clean accents', () => {
    const result = toKebabCase('açaí');

    expect(result).toBe('acai');
  });

  it('should be able to convert separators', () => {
    const result = toKebabCase('hello/hi,a');

    expect(result).toBe('hello-hi-a');
  });
});
