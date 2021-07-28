const path = require('path')
module.exports = {
  lintOnSave: true,
  productionSourceMap: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/theme.less')]
    }
  },
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  configureWebpack: {
    mode: process.env.NODE_ENV,
    externals: {
      AMap: 'window.AMap'
    }
  },
  devServer: {
    // 设置代理
    proxy: {
      '/political-eco': {
        target: 'http://192.168.3.136:8884/political-eco', // docker 容器内部 Apollo 访问地址和端口
        changeOrigin: true,
        pathRewrite: {
          '^/political-eco': '/'
        }
      }
    }
  }
}
