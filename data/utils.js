/* @flow */

import { GraphQLNonNull, GraphQLID, type GraphQLFieldConfig } from 'graphql';
import Hashids from 'hashids';

import { mapTypeToId, mapIdToType } from './types';

const hashids = new Hashids('Happy Salting');

class TypeError extends Error {}

export const toGlobalId = (type: string, id: number): string => {
  const typeId = mapTypeToId(type);
  if (typeId !== undefined) {
    return hashids.encode(mapTypeToId(type), id);
  }
  throw new TypeError(`Unknown type: ${type}`);
};

export const fromGlobalId = (
  globalId: string,
): {
  type: ?string,
  id: number,
} => {
  const [typeId, id] = hashids.decode(globalId);
  const type = mapIdToType(typeId);
  if (type && id) {
    return { type, id };
  }
  // Cannot find type
  return { type: null, id: 0 };
};

// To replace globalIdField from relay package
export const globalIdField = (
  typeName?: ?string,
): GraphQLFieldConfig<*, *> => ({
  name: 'id',
  description: 'The ID of an object',
  type: new GraphQLNonNull(GraphQLID),
  resolve: (obj, args, context, info) =>
    toGlobalId(typeName || info.parentType.name, obj.id),
});
