import fs from 'fs'
import _debug from 'debug'

const debug = _debug('app:config')
const loadConfig = (configPath, baseConfig) => {

	let _config = {}

	// load config
	try {
		//找到当前运行环境下的 配置 文件
		if (fs.existsSync(`${configPath}.js`)) {
			debug(`Load config : ${configPath}`)
			
			_config = require(configPath)
			_config = (typeof _config === 'function') ? _config(baseConfig) : _config
		}
	} catch (error) {
		debug(`Load config Error: ${error.message}`)
	}

	return _config
}

export default loadConfig
