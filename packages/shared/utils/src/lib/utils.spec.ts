import {
  capitalizeFirstLetterAndLowercaseRest,
  getPairSymbol,
  maskHalfText,
  replaceHalfWithStars,
} from './utils';

describe('text utilities', () => {
  it.each([
    ['abcdef', 'abc***'],
    ['abcde', 'abc**'],
    ['a', 'a'],
    ['', ''],
  ])('masks the second half of %p', (input, expected) => {
    expect(maskHalfText(input)).toBe(expected);
    expect(replaceHalfWithStars(input)).toBe(expected);
  });

  it.each([
    ['hELLO', 'Hello'],
    ['ALREADY UPPER', 'Already upper'],
    ['', ''],
  ])('capitalizes only the first letter of %p', (input, expected) => {
    expect(capitalizeFirstLetterAndLowercaseRest(input)).toBe(expected);
  });

  it('builds a pair symbol without changing either ticker', () => {
    expect(getPairSymbol('BTC', 'USDT')).toBe('BTCUSDT');
  });
});
