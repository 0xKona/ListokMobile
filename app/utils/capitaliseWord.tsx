export const capitaliseWord = (input: string) => {
  if (!input) {
    return '';
  }
  const words = input.split(' ');

  const capitalise = (word: string): string => {
    const char1 = word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();
    return char1 + rest;
  };

  if (words.length > 1) {
    const result = words
      .reduce((acc: string[], curr) => {
        return [...acc, capitalise(curr)];
      }, [])
      .join(' ');
    return result;
  } else {
    return capitalise(input);
  }
};
