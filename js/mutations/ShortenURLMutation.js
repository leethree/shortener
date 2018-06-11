/* @flow */

import { commitMutation, graphql, type Environment } from 'react-relay';

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

// TODO: use UUID as clientMutationId
let tempID = 0;

const commit = (environment: Environment, url: string, userId: string) =>
  new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: {
        input: {
          url,
          clientMutationId: tempID++,
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
          // Extract the first error message
          const { message } = errors[0];
          console.error(message || 'An error has occured.');
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
