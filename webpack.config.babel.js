import webpack from 'webpack';
import path from 'path';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config = {
  devtool: '#eval-source-map',
  entry: './client/src/flashBack',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
    // new BundleAnalyzerPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     // NODE_ENV: JSON.stringify('development')
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     unused: true,
    //     dead_code: true, // big one--strip code that will never execute
    //     warnings: false, // good for prod apps so users can't peek behind curtain
    //     drop_debugger: true,
    //     conditionals: true,
    //     evaluate: true,
    //     drop_console: true, // strips console statements
    //     sequences: true,
    //     booleans: true,
    //   }
    // })
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
        test: /\.(scss|css)$/, 
        include: path.join(__dirname, 'client/src/styles'),
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
};

export default config;
