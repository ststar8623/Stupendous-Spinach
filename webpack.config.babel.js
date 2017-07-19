import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';

const config = {
  entry: './client/src/flashBack',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
    // jsx
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'client/src'),
        exclude: /node_modules/
      },
      // CSS
      { 
        test: /\.styl$/, 
        include: path.join(__dirname, 'client/src'),
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  }
};

export default config;
