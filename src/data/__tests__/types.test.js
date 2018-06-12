/* @flow */

import { URLEntry, mapTypeToId, mapIdToType } from '../types';

test('Node constructor assigns properties', () => {
  expect(
    new URLEntry({ _id: 3239, test: 'test', url: 'www.example.com' }),
  ).toEqual({ id: 3239, test: 'test', url: 'www.example.com' });
});

test.each(['User', 'URL'])('Type %s converts to ID and vice versa', type => {
  const id = mapTypeToId(type);
  expect(typeof id).toBe('number');
  expect(mapIdToType(id)).toBe(type);
});

test('Unknown type converts to undefined', () => {
  expect(mapTypeToId('Unknown')).toBeUndefined();
  expect(mapIdToType(-1)).toBeUndefined();
});
