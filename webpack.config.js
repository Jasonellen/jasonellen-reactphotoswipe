var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
    	{ test: /\.js|jsx$/, use: 'babel-loader',exclude: /node_modules/ },
      { test: /\.css$/, use: 'css-loader' },
			{ test: /\.(?:jpg|gif|png|pic|svg)$/, use: 'url-loader'},
    ]
  },
}
