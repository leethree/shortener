import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const baseConfig = {
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/client/app.js')],
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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
    }),
  ],
};

export default (env, argv) => {
  if (argv.mode === 'development') {
    // Development config
    return {
      ...baseConfig,
      mode: 'development',
      devtool: 'source-map',
      // setup dev server
      devServer: {
        contentBase: false,
        port: 8080,
        proxy: {
          '/**': 'http://localhost:3000',
        },
      },
    };
  }
  if (argv.mode === 'production') {
    // Production config
    return {
      ...baseConfig,
      mode: 'production',

      plugins: [
        // Tells React to build in prod mode.
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          __DEV__: false,
        }),
        // generate optimized assets
        new HtmlWebpackPlugin({
          template: 'public/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyURLs: true,
          },
          inject: true,
        }),
      ],
    };
  }
  return baseConfig;
};
