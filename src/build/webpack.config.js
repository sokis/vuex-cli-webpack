import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config, { paths } from '../config'

import _debug from 'debug'
const debug = _debug('app:webpack')
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.css', '.js', '.json', '.vue'],
    alias: {}
  },
  node: { fs: 'empty', net: 'empty' },
  module: {},
  devtool: config.compiler_devtool
}

// ------------------------------------
// Webpack Dev Server
// ------------------------------------
webpackConfig.devServer = {
  contentBase: paths.src(),
  host: config.server_host,
  port: config.server_port,
  quiet: config.compiler_quiet,
  stats: config.compiler_stats,
  compress: true,
  lazy: false,
  hot: true,
  noInfo: false
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATHS = [
  paths.src('main.js')
]

webpackConfig.entry = {
  app: APP_ENTRY_PATHS //,
    // vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: paths.dist(),
  publicPath: config.compiler_public_path,
  filename: `js/[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `js/[id].[${config.compiler_hash_type}].js`
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: paths.src('index.html'),
    hash: false,
    favicon: paths.src('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    }
  }),
  new CopyWebpackPlugin([{
    from: paths.src('static')
  }], {
    ignore: ['README.md']
  })
]

// ------------------------------------
// Pre-Loaders
// ------------------------------------
const loaders = [{
  test: /\.(js|vue)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    emitWarning: __DEV__,
    formatter: require('eslint-friendly-formatter')
  },
  enforce: 'pre'
}]

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = loaders.concat([{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: {
        css: __PROD__ ? ExtractTextPlugin.extract({
          loader: 'css-loader?sourceMap',
          fallbackLoader: 'vue-style-loader'
        }) : 'vue-style-loader!css-loader?sourceMap&-minimize',
        js: 'babel-loader'
      }
    }
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.html$/,
    loader: 'vue-html-loader'
  },
  /* eslint-disable */
  { test: /\.woff(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
  /* eslint-enable */
])

// ------------------------------------
// Style Configuration
// ------------------------------------
const vueLoaderOptions = {
  postcss: pack => {
    // use webpack context
    return [
      require('postcss-import')({
        path: paths.src('styles'),
        addDependencyTo: pack
      }),
      require('postcss-url')({
        basePath: paths.src('static')
      }),
      require('postcss-mixins')({
        mixinsDir: paths.src('styles/mixins')
      }),
      require('postcss-cssnext')({
        browsers: 'Android >= 4, iOS >= 7',
        features: {
          customProperties: {
            variables: require(paths.src('styles/variables'))
          }
        }
      }),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ]
  },
  autoprefixer: false
}

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    })
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/[name].[contenthash].css')
  )
}

// load config 
export default webpackConfig
