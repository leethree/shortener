/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Text, Box } from 'rebass';

const URLCount = ({ viewer }) => {
  const numUrls = viewer.totalCount;
  return (
    <Box color="#888888">
      {numUrls === 0 ? (
        <Text textAlign="right">Shorten URL above</Text>
      ) : (
        <Text textAlign="right">
          <strong>{numUrls}</strong> URL{numUrls === 1 ? '' : 's'} shortened
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
