# vuex-cli-webpack
一个独立的vue2+webpack2 构建，基开发配置工具
1. 独立的配置项依赖 做专业的事
1. 支持自定义配置，扩展方便原始项目迁移

## 使用方法

```javascript
import { server , compile} from 'vuex-cli-webpack'

//调用
server()
compile()
```

**命令行调用**
```
# 启动开发服务器
$ node ./node_modules/.bin/vserver


# 编译代码
$ node ./node_modules/.bin/vcompile

```

## 一些约束
默认的配置是按照目前流行的配置方案来做的，实际开发中多少会需要修改
这个时候，你只需要在项目根目录下创建`config`文件夹，并且在文件夹下添加对应的配置文件即可
```
config
├── development.conf.js      # 开发环境配置
├── production.conf.js		 # 生产环境配置
├── ... ...					 # 测试等
└── webpack.config.js		 # webpack配置
```

## development.conf.js

开发环境下的配置文件

```javascript
// ======================================================
// Overrides when NODE_ENV === 'development'
// ======================================================
module.exports = config => ({
  compiler_public_path: '/',
  compiler_devtool: 'eval'
})
```

## production.conf.js

生产环境下的配置文件

```javascript
// ======================================================
// Overrides when NODE_ENV === 'production'
// ======================================================
module.exports = config => ({
  compiler_public_path: '',
  compiler_devtool: false,
  compiler_hash_type: 'chunkhash',
  compiler_html_minify: true,
  compiler_stats: {
    chunks: true,
	chunkModules: true,
	colors: true
  }
})
```

### 一部分配置项说明

+ **compiler_public_path**：webpack.publicPath 用法相同
+ **compiler_hash_type**：设置文件名中hash命名类型
+ **compiler_html_minify**：设置html,js,css是否压缩


## webpack.config.js

默认提供了一套配置，当需要修改配置请在项目根路径下`config`目录中添加 `webpack.config.js`

```javascript
// ======================================================
// webpack.config.js
// ======================================================
module.exports = ({ paths }) => {
	entry: {
		app: './src/main.js'
	},
	resolve: {
		alias: {
			"store": paths.src('store'),
			"components": paths.src('components')
		}
	}
}
```