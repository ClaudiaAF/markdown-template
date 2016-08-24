var webpack = require("webpack")
module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: 'css-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
