/* @flow */

import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import { fromGlobalId, globalIdField } from './utils';
import {
  URLEntry,
  addURL,
  getURL,
  getURLs,
  User,
  getUser,
  getViewer,
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'URL') {
      return getURL(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  obj => {
    if (obj instanceof URLEntry) {
      return GraphQLURL;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  },
);

const GraphQLURL = new GraphQLObjectType({
  name: 'URL',
  fields: {
    id: globalIdField('URL'),
    url: {
      type: GraphQLString,
      resolve: obj => obj.url,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: URLsConnection,
  edgeType: GraphQLURLEdge,
} = connectionDefinitions({
  name: 'URL',
  nodeType: GraphQLURL,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    urls: {
      type: URLsConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getURLs(obj.id), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getURLs().length,
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});

const GraphQLShortenURLMutation = mutationWithClientMutationId({
  name: 'ShortenURL',
  description: 'Get shortened URL',
  inputFields: {
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    urlEdge: {
      type: GraphQLURLEdge,
      resolve: ({ localId }) => {
        const url = getURL(localId);
        return {
          cursor: cursorForObjectInConnection(getURLs(), url),
          node: url,
        };
      },
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({ url }) => {
    const localId = addURL(url);
    return { localId };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: {
    shortenURL: GraphQLShortenURLMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
