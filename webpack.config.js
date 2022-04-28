const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  entry: './index.ts',
  devtool: 'eval-source-map',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  }
}

 