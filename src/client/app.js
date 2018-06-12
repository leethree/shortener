/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryRenderer, graphql } from 'react-relay';
import { Provider, Container } from 'rebass';
import logger from 'minimal-logger';

import environment from './environment';
import AppHome from './components/AppHome';
import Loading from './components/Loading';

const mount = document.getElementById('root');
if (mount == null) {
  throw new Error('No root element for React');
}

const appQuery = graphql`
  query appQuery {
    viewer {
      ...AppHome_viewer
    }
  }
`;

const App = () => (
  <Provider>
    <Container my={64} maxWidth={800}>
      <QueryRenderer
        environment={environment}
        query={appQuery}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            logger.error(error);
          }
          if (props) {
            return <AppHome {...props} />;
          }
          return <Loading />;
        }}
      />
    </Container>
  </Provider>
);

ReactDOM.render(<App />, mount);
