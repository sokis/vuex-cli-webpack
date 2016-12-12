var webpack = require('webpack')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = ({ paths }) => ({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      styles: paths.src('styles')
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(paths.base('dll/vendor-manifest.json')), // 指定manifest.json
      name: 'vendor'
    }),
    new AddAssetHtmlPlugin([
      { filepath: paths.base('dll/vendor.dll.js'), includeSourcemap: false }
    ])
  ]
})
