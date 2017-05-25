const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['latest', 'react'],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 3000,
  },
}
