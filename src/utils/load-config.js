import fs from 'fs'
import _debug from 'debug'

const debug = _debug('app:config')
const loadConfig = configPath => {

	let config = {}

	// load config
	try {
		//找到当前运行环境下的 webpack.config 并且合并
		if (fs.existsSync(`${configPath}.js`)) {
			debug('Merge webpack config .')
			config = require(configPath)
		}
	} catch (error) {
		console.log(error);
	}

	return config
}

export default loadConfig