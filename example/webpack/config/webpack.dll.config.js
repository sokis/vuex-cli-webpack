const webpack = require('webpack')
module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  output: {
    path: 'dll/',
    filename: '[name].dll.js',
    library: '[name]' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    polyfill: ['babel-polyfill'],
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-actions',
      'vuex-localstorage',
      'vuex-router-sync'
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'dll/[name]-manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name].dll' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  ]
}
