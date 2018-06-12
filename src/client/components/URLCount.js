/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Text, Box } from 'rebass';

import { type URLCount_viewer } from './__generated__/URLCount_viewer.graphql';

type Props = {
  viewer: URLCount_viewer,
};

const URLCount = ({ viewer }: Props) => {
  const numUrls = viewer.totalCount;
  return (
    <Box color="#888888">
      {numUrls && numUrls <= 10 ? (
        <Text textAlign="right">
          <strong>{numUrls}</strong> URL{numUrls === 1 ? '' : 's'} shortened
        </Text>
      ) : (
        <Text textAlign="right">
          Showing 10 of <strong>{numUrls}</strong> URLs shortened
        </Text>
      )}
    </Box>
  );
};

export default createFragmentContainer(
  URLCount,
  graphql`
    fragment URLCount_viewer on User {
      id
      totalCount
    }
  `,
);
