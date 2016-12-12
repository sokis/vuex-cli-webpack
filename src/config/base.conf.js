/* eslint key-spacing:0 spaced-comment:0 */
import { resolve } from 'path'
import fs from 'fs'

import _debug from 'debug'
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
  path_base: process.cwd(),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_conf: 'config',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0', // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_html_minify: false,
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: [
    'vue',
    'vue-router',
    'vuex',
    'vuex-actions',
    'vuex-localstorage',
    'vuex-router-sync'
  ]
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
  '__TEST__': config.env === 'test'
}

// ------------------------------------
// Utilities
// ------------------------------------
const base = (...args) => resolve.apply(resolve, [config.path_base, ...args])
config.paths = {
  base,
  src: base.bind(null, config.dir_src),
  dist: base.bind(null, config.dir_dist),
  conf: base.bind(null, config.dir_conf)
}

export default config