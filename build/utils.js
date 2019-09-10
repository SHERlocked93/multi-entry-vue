'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const fs = require('fs')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ENTRY_PATH = path.resolve(__dirname, '../entries')

exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}
  
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  
  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  
  return (severity, errors) => {
    if (severity !== 'error') return
    
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    
    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 多入口配置 entries
exports.entries = function() {
  const entryFiles = glob.sync(ENTRY_PATH + '/*/*.js')
  const map = {}
  entryFiles.forEach(filePath => {
    const filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
    map[filename] = filePath
  })
  return map
}

// 多页面输出模版配置 HtmlWebpackPlugin
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(ENTRY_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach(filePath => {
    let filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
    let conf = {
      template: filePath,
      filename: filename + '.html',
      chunks: [filename],
      inject: true
    }
    
    // production 生产模式下配置
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf,
        {
          chunks: ['manifest', 'vendor'],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          chunksSortMode: 'dependency'
        })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
