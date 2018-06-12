/* @flow */
import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import logger from 'minimal-logger';

import schema from '../data/schema';
import router from './router';

// TODO: move to env
const APP_PORT = 3000;
const APP_HOST = 'localhost';
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

// Serve static resources if not in development
if (!isDev) {
  app.use('/', express.static(path.resolve(__dirname, '../../dist')));
}

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: isDev,
    pretty: isDev,
  }),
);

// Setup redirection
app.use(router);

app.listen(APP_PORT, APP_HOST, () => {
  logger.info(`Server is now running on http://${APP_HOST}:${APP_PORT}`);
});
