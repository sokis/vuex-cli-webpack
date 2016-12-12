import merge from 'webpack-merge'
import loadConfig from '../utils/load-config'
import base, { paths } from './base.conf'

import _debug from 'debug'
const debug = _debug('app:webpack')

// load config
const config = loadConfig(paths.conf(`${base.env}.conf`), base)

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require(`${base.path_base}/package.json`)

const mergeConfig = merge(base, config)

mergeConfig.compiler_vendor = mergeConfig.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle. Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

export default mergeConfig