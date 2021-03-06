/* @flow */

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = async (operation, variables) => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return response.json();
};

// Relay Environment
export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
