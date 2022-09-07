import { StringUtils } from '../';

describe('#Utils - Strings', () => {
  describe('#upperCaseFirstLetter', () => {
    it.each([
      { input: 'hello', output: 'Hello' },
      { input: 't', output: 'T' },
      { input: 'Test', output: 'Test' },
      { input: '', output: '' },
    ])('should return the first letter in upperCase', ({ input, output }) => {
      expect(StringUtils.upperCaseFirstLetter(input)).toBe(output);
    });
  });

  describe('#lowerCaseFirstLetter', () => {
    it.each([
      { input: 'hello', output: 'hello' },
      { input: 'T', output: 't' },
      { input: 'Test', output: 'test' },
      { input: '', output: '' },
    ])('should return the first letter in upperCase', ({ input, output }) => {
      expect(StringUtils.lowerCaseFirstLetter(input)).toBe(output);
    });
  });
});
