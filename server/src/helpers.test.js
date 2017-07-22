import { hash } from './helpers'

test('hash return same fixed length string for given string.', () => {
  const inputString = 'hi';
  const firstHashResult = hash(inputString, 12);
  const secondHashResult = hash(inputString);
  expect(firstHashResult).toEqual(secondHashResult);
});
