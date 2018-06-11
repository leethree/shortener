/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Panel, Box, Label } from 'rebass';

import ShortenURLMutation from '../mutations/ShortenURLMutation';
import URLList from './URLList';
import URLCount from './URLCount';
import URLInput from './URLInput';

const AppHome = ({ viewer, relay }) => {
  const handleInputSave = text =>
    ShortenURLMutation.commit(relay.environment, text, viewer);

  return (
    <Panel color="blue">
      <Panel.Header p={16} color="white" bg="blue">
        URL Shortener
      </Panel.Header>
      <Box p={16}>
        <Label>Enter URL:</Label>
        <URLInput autoFocus onSave={handleInputSave} placeholder="https://" />
        <URLList viewer={viewer} />
      </Box>
      <Panel.Footer p={16} color="blue">
        <URLCount viewer={viewer} />
      </Panel.Footer>
    </Panel>
  );
};

export default createFragmentContainer(AppHome, {
  viewer: graphql`
    fragment AppHome_viewer on User {
      id
      totalCount
      ...URLCount_viewer
      ...URLList_viewer
    }
  `,
});
