/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Box, Divider } from 'rebass';

import URLEntry from './URLEntry';
import { type URLList_viewer } from './__generated__/URLList_viewer.graphql';

type Props = {
  viewer: URLList_viewer,
};

const URLList = ({ viewer }: Props) => {
  if (!viewer.urls || !viewer.urls.edges || viewer.urls.edges.length === 0) {
    return null;
  }
  const { edges } = viewer.urls;
  const renderEdge = edge => {
    if (edge && edge.node) {
      return <URLEntry key={edge.node.id} url={edge.node} />;
    }
    return null;
  };
  return (
    <Box mt={16}>
      <Divider />
      {edges.slice(0, 10).map(renderEdge)}
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
