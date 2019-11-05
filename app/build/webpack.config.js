const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test output',
      template: 'src/index.html',
      inject: true
    }),
    new CleanWebpackPlugin({ dry: true })
  ]
}
