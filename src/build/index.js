import loadConfig from '../utils/load-config'
import merge from 'webpack-merge'
import config, { paths } from '../config'
import webpackConfig from './webpack.config'

export default merge(webpackConfig, loadConfig(paths.conf('webpack.config'), config))