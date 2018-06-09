/* @flow */

import {
  GraphQLNonNull,
  GraphQLID,
  type GraphQLFieldConfig,
  type GraphQLResolveInfo,
} from 'graphql';
import Hashids from 'hashids';

const hashids = new Hashids('Happy Salting');

const typeToIds = {
  URL: 0,
  User: 1,
};
const idToTypes = Object.entries(typeToIds).reduce((res, [key, value]) => {
  res[value] = key;
  return res;
}, {});

class TypeError extends Error {}

export const toGlobalId = (type: string, id: number): string => {
  if (type in typeToIds) {
    return hashids.encode(typeToIds[type], id);
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
  const type = idToTypes[typeId];
  if (type && id) {
    return { type, id };
  }
  // Cannot find type
  return { type: null, id: 0 };
};

// To replace globalIdField from relay package
export const globalIdField = (
  typeName?: ?string,
  idFetcher?: (object: any, context: any, info: GraphQLResolveInfo) => string,
): GraphQLFieldConfig<*, *> => ({
  name: 'id',
  description: 'The ID of an object',
  type: new GraphQLNonNull(GraphQLID),
  resolve: (obj, args, context, info) =>
    toGlobalId(
      typeName || info.parentType.name,
      idFetcher ? idFetcher(obj, context, info) : obj.id,
    ),
});
