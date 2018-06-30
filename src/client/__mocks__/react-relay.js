import React from 'react';

const relayEnvironment = {
  lookup: jest.fn(),
};

const relayFragmentProps = {
  relay: {
    environment: relayEnvironment,
  },
};

const relayRefetchProps = {
  relay: {
    environment: relayEnvironment,
    refetch: jest.fn(),
  },
};

const relayPaginationProps = {
  relay: {
    environment: relayEnvironment,
    hasMore: jest.fn(),
    loadMore: jest.fn(),
    isLoading: jest.fn(),
  },
};

const makeRelayWrapper = relayProps => Comp => props => (
  <Comp {...props} {...relayProps} />
);

export const QueryRenderer = jest.fn(() =>
  React.createElement('div', null, 'Test'),
);

export const createFragmentContainer = makeRelayWrapper(relayFragmentProps);
export const createRefetchContainer = makeRelayWrapper(relayRefetchProps);
export const createPaginationContainer = makeRelayWrapper(relayPaginationProps);
