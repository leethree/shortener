/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Box, Divider } from 'rebass';

import URLEntry from './URLEntry';

const URLList = ({ viewer }) => {
  const { edges } = viewer.urls;
  if (!edges || edges.length === 0) {
    return null;
  }
  const renderEdge = edge => <URLEntry key={edge.node.id} url={edge.node} />;
  return (
    <Box mt={16}>
      <Divider />
      {edges.map(renderEdge)}
    </Box>
  );
};

export default createFragmentContainer(URLList, {
  viewer: graphql`
    fragment URLList_viewer on User
      @argumentDefinitions(count: { type: "Int", defaultValue: 10 }) {
      urls(first: $count) @connection(key: "URLList_urls") {
        edges {
          node {
            id
            ...URLEntry_url
          }
        }
      }
      id
      totalCount
    }
  `,
});
