export class StringUtils {
  static #transform({ str: [first, ...rest ], upperCase = true }) {
    if (!first) return '';
    
    const firstLetter = upperCase ? first?.toUpperCase() : first?.toLowerCase();

    return [firstLetter, ...rest].join('');
  };

  static upperCaseFirstLetter(str) {
    return StringUtils.#transform({ str });
  };

  static lowerCaseFirstLetter(str) {
    return StringUtils.#transform({ str, upperCase: false });
  }
}