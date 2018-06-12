/* @flow */

import { commitMutation, graphql, type Environment } from 'react-relay';
import uuidv4 from 'uuid/v4';

const mutation = graphql`
  mutation ShortenURLMutation($input: ShortenURLInput!) {
    shortenURL(input: $input) {
      urlEdge {
        __typename
        cursor
        node {
          id
          url
        }
      }
      viewer {
        id
        totalCount
      }
    }
  }
`;

const commit = (environment: Environment, url: string, userId: string) =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          url,
          clientMutationId: uuidv4(),
        },
      },
      configs: [
        {
          type: 'RANGE_ADD',
          parentID: userId,
          connectionInfo: [
            {
              key: 'URLList_urls',
              rangeBehavior: 'append',
            },
          ],
          edgeName: 'urlEdge',
        },
      ],
      onCompleted: (response: ?Object, errors: ?Array<Error>) => {
        if (errors) {
          // Extract the first error
          reject(errors[0]);
        } else {
          resolve(response);
        }
      },
      onError: (error: Error) => {
        reject(error);
      },
    });
  });

export default { commit };
