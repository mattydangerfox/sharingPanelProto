import { hash } from './helpers'

test('hash return same fixed length string for given string.', () => {
  const inputString = 'hi';
  const firstHashResult = hash({ string: inputString, length: 12 });
  const secondHashResult = hash({ string: inputString, length: 12 });
  expect(firstHashResult).toEqual(secondHashResult);
});
