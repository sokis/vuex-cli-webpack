/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import _debug from 'debug'
import { argv } from 'yargs'
import ip from 'ip'

import { join } from 'path'
import fs from 'fs'

import merge from 'webpack-merge'
import loadConfig from '../utils/load-config'

const localip = ip.address()
const debug = _debug('app:config')
debug('Creating default configuration.')

const threshold = 0


// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: process.env.PWD,
  dir_client: 'src',
  dir_dist: 'dist',
  dir_conf: '.tools/config',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: localip, // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,
  server_mock: !!argv.mock,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: true,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: [
    'history',
    'vue',
    'vue-router',
    'vuex',
    'vuex-localstorage',
    'vuex-promise',
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ],
  coverage_check: {
    global: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    },
    each: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    }
  }
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__COVERAGE__': !argv.watch && config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}


// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist),
  conf: base.bind(null, config.dir_conf)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments')
const overrides = environments[config.env]

// try {
//   //找到当前运行环境下的 webpack.config 并且合并
//   if (fs.existsSync(join(config.path_base, 'webpack.config.js'))) {
//     debug('Merge webpack config .')
//     const environments = require(`${process.env.PWD}/webpack.config`)
//     const overrides = environments[config.env]

//     if (overrides) {
//       Object.assign(config, overrides)
//     }
//   }
// } catch (error) { }

if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require(`${config.path_base}/package.json`)

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })


const { conf } = config.utils_paths
// load config 
export default merge(config, loadConfig(conf(`${config.env}.conf`)))