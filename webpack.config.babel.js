import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/flashBack',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'client/src')
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
