const config = require('./webpack.config')
const merge = require('webpack-merge')
module.exports = merge(config, {
  mode: 'development',
  devtool: '#cheap-eval-source-map',
  devServer: {
    hot: true,
    open: true
  }
})
