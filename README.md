# vuex-cli-webpack
抽离webpack 构建相关任务。已经集成到`vuex-cli@2.0` .
也可以单独使用

## 使用方法

```javascript
import { server , compile} from 'vuex-cli-webpack'

//调用
server();
```

**命令行调用**
```
## 启动开发服务器
$ node ./node_modules/.bin/vuex-webpack-server


## 编译代码
$ node ./node_modules/.bin/vuex-webpack-compile

```


## webpack.config.js

默认提供了一套配置，当需要修改配置请在当前项目根路径下添加 `webpack.config.js`
为了方便调用默认配置，配置方式做了些调整

> 升级原有的配置，只需要根据情况做些调整即可

```javascript
//webpack.config.js

/**
 *  webpack 相关配置 
 */
var compiler_vendor =  [
	'history',
	'vue',
	'vue-router',
	'vuex',
	'vuex-localstorage',
	'vuex-promise',
];

module.exports = {
	
	// ======================================================
	// NODE_ENV === 'development'
	development: function (config) {
		return {
			compiler_vendor:compiler_vendor,
			compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
			proxy: {
				enabled: true,
				options: {
					host: 'http://cnodejs.org/',
					match: /^\/api\/.*/
				}
			},

			// 添加自定义配置
			myconfig: 1111
		}
	},

	// ======================================================
	// NODE_ENV === 'production'
	// ======================================================
	production: function (config) {

		return {
			compiler_vendor:compiler_vendor,
			compiler_public_path: '/',
			compiler_fail_on_warning: false,
			compiler_hash_type: 'chunkhash',
			compiler_devtool: null,
			compiler_stats: {
				chunks: true,
				chunkModules: true,
				colors: true
			}
		}
	}
}
```