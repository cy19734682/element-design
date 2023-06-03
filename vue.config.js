'use strict'
const path = require('path')
const compressionPlugin = require("compression-webpack-plugin")
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/admin": {
        target: `http://localhost:8360`,
        changeOrigin: true,
        pathRewrite: {
          ['^/admin']: ["/admin"]
        },
        secure:true
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
  configureWebpack: config => {
    config.name = 'element-design组件'
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new compressionPlugin({
          test: /\.(js|css)$/,
          threshold: 10240, // 小于10KB就不进行压缩
          deleteOriginalAssets: false // 删除源文件
        })
      )
    }
  },
  chainWebpack(config) {
    config.module
      .rule('js')
      .include
      .add('/src/')
      .add('/examples/')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })

  }
}
