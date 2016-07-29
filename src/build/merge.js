import loadConfig from '../utils/load-config'
import merge from 'webpack-merge'
import {utils_paths} from '../config/merge'
import webpackConfig from './webpack.config'

export default merge(webpackConfig, loadConfig(utils_paths.conf('webpack.config')))