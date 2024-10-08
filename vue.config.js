'use strict'
const { defineConfig } = require('@vue/cli-service')
const compressionPlugin = require('compression-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = defineConfig({
	publicPath: './',
	outputDir: 'dist',
	assetsDir: '',
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		port: port,
		proxy: {
			'/admin': {
				target: `http://localhost:8361`,
				changeOrigin: true,
				pathRewrite: {
					['^/admin']: ['']
				},
				secure: true
			}
		}
	},
	pages: {
		index: {
			entry: 'examples/main.js',
			template: 'public/index.html',
			filename: 'index.html'
		}
	},
	css: {
		extract: true //是否将组件中的样式提取到独立的css文件中
	},
	configureWebpack: (config) => {
		config.name = 'element-design'
    if (process.env.NODE_ENV === 'production') {
      if (process.env.BUILD_ENV === 'lib') {
        config.externals = [
          '@wangeditor/editor',
          '@wangeditor/editor-for-vue',
          'axios',
          'echarts',
          'element-ui',
          'element-china-area-data',
          'js-cookie',
          'jszip',
          'lodash',
          'moment',
          'file-saver',
          'vue',
          'vue-baidu-map',
          'vue-i18n',
          'vue-router',
          'xlsx',
          'deepmerge'
        ]
      }
      config.plugins.push(
				new compressionPlugin({
					test: /\.(js|css)$/,
					threshold: 10240, // 小于10KB就不进行压缩
					deleteOriginalAssets: false // 删除源文件
				})
			)
		}
		config.plugins.push(new NodePolyfillPlugin())
	},
	chainWebpack(config) {
		config.module
			.rule('js')
			.include.add('/src/')
			.add('/examples/')
			.end()
			.use('babel')
			.loader('babel-loader')
			.tap((options) => {
				// 修改它的选项...
				return options
			})
		config.module
			.rule('md')
			.test(/\.md/)
			.use('vue-loader')
			.loader('vue-loader')
			.end()
			.use('vue-markdown-loader')
			.loader('vue-markdown-loader/lib/markdown-compiler')
			.options({
				raw: true
			})
	}
})
