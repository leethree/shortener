/* @flow */

import React from 'react';
import { createFragmentContainer, graphql, type RelayProp } from 'react-relay';
import { Panel, Box, Label, Small, Link } from 'rebass';

import ShortenURLMutation from '../mutations/ShortenURLMutation';
import URLList from './URLList';
import URLCount from './URLCount';
import URLInput from './URLInput';
import { type AppHome_viewer } from './__generated__/AppHome_viewer.graphql';

type Props = {
  relay: RelayProp,
  viewer: AppHome_viewer,
};

const AppHome = ({ viewer, relay }: Props) => {
  const handleInputSave = text =>
    ShortenURLMutation.commit(relay.environment, text, viewer.id);

  return (
    <React.Fragment>
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
      <Small>
        <Link href="https://github.com/leethree/shortener" target="_blank">
          GitHub
        </Link>
      </Small>
    </React.Fragment>
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
