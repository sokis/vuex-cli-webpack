var webpack = require('webpack')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = (config) => ({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      styles: config.paths.src('styles')
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(config.paths.base('dll/vendor-manifest.json')), // 指定manifest.json
      name: 'vendor'
    }),
    new AddAssetHtmlPlugin([
      { filepath: config.paths.base('dll/vendor.dll.js'), includeSourcemap: false }
    ])
  ]
})