/* @flow */

import { toGlobalId, fromGlobalId } from '../utils';

const testTypes = ['User', 'URL'];
const testIds = [1, 6, 23, 219321];

const testCases = testTypes.reduce(
  (cases, item) => cases.concat(testIds.map(id => [item, id])),
  [],
);

test.each(testCases)('Convert local ID (%s) to global ID', (type, localId) => {
  const globalId = toGlobalId(type, localId);
  expect(globalId.length).toBeGreaterThan(0);
  expect(fromGlobalId(globalId)).toEqual({ type, id: localId });
});

test('Unknown type raises error', () => {
  expect(() => {
    toGlobalId('Unknown', 5);
  }).toThrow();
});

test('Unknown global ID converts to empty', () => {
  expect(fromGlobalId('Unknown')).toEqual({ type: null, id: 0 });
});
