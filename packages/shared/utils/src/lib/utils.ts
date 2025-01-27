export function utils(): string {
  return 'utils';
}


export const maskHalfText = (text: string): string => {
  const half = Math.ceil(text.length / 2);

  const firstHalf = text.slice(0, half);

  const secondHalfMask = '*'.repeat(text.length - half);

  const maskedText = firstHalf + secondHalfMask;

  return maskedText;
}

export const capitalizeFirstLetterAndLowercaseRest = (input: string): string => {
  if (input.length === 0) {
      return input;
  }
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function getPairSymbol(
  tickerOrigin: string,
  tickerDestination: string
): string {
  return tickerOrigin + tickerDestination;
}

export const replaceHalfWithStars = (inputString: string) => {
  let midpoint = Math.ceil(inputString.length / 2);

  let replacedString = inputString.substring(0, midpoint) + '*'.repeat(inputString.length - midpoint);

  return replacedString;
}
