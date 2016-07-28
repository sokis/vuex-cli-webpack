// ======================================================
// NODE_ENV === 'development'
// ======================================================

var config = require('../../lib/config')

module.exports = {
	compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
	proxy: {
		enabled: true,
		options: {
			host: 'http://cnodejs.org/',
			match: /^\/api\/.*/
		}
	}
}