import webpack from 'webpack';
import path from 'path';

const config = {
  devtool: '#eval-source-map',
  entry: './client/src/flashBack',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin()
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
