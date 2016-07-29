import loadConfig from '../utils/load-config'
import merge from 'webpack-merge'
import base, { utils_paths } from './index'


// load config
const config = loadConfig(utils_paths.conf(`${base.env}.conf`))

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require(`${base.path_base}/package.json`)

config.compiler_vendor = base.compiler_vendor
	.filter((dep) => {
		if (pkg.dependencies[dep]) return true

		debug(
			`Package "${dep}" was not found as an npm dependency in package.json; ` +
			`it won't be included in the webpack vendor bundle. Consider removing it from vendor_dependencies in ~/config/index.js`
		)
	})

export default merge(base, config)