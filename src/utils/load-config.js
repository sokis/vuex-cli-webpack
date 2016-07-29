import fs from 'fs'
import _debug from 'debug'

const debug = _debug('app:config')
const loadConfig = (configPath) => {

	let _config = {}

	// load config
	try {
		//找到当前运行环境下的 配置 文件
		if (fs.existsSync(`${configPath}.js`)) {
			debug(`Load config : ${configPath}`)
			_config = require(configPath)

			// if(_config)
		}
	} catch (error) {
		debug(`Load config Error: ${error.message}`)
	}

	return  _config
}

export default loadConfig