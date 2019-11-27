const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: '',

  pages: {
    // 管理平台
    manage: {
      // page 的入口
      entry: 'src/pages/manage/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'manage.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '和充电运营管理平台'
    },
    // 政企管理平台
    enterprise: {
      // page 的入口
      entry: 'src/pages/enterprise/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'enterprise.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '和充电政企管理平台'
    },
    // 运营商管理平台
    operator: {
      // page 的入口
      entry: 'src/pages/operator/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'operator.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '和充电运营商管理平台'
    }
  },

  productionSourceMap: false,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('./'))
      .set('@enterprise', resolve('src/pages/enterprise'))
      .set('@manage', resolve('src/pages/manage'))
      .set('@operator', resolve('src/pages/operator'))
  },

  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/sass/global.scss";'
      }
    }
  },

  outputDir: undefined,
  assetsDir: 'static',
  runtimeCompiler: true,
  parallel: undefined
}
