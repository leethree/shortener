/* @flow */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import schema from '../data/schema';

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_PORT = 3000;

// Serve the Relay app
const compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(ROOT_DIR, 'js', 'app.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: '/',
  },
});
const app = new WebpackDevServer(compiler, {
  contentBase: path.resolve(ROOT_DIR, 'public'),
  publicPath: '/js/',
  stats: { colors: true },
});

// Serve static resources
app.use('/', express.static(path.resolve(ROOT_DIR, 'public')));

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    pretty: true,
  }),
);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
