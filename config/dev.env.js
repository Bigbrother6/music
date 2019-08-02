'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  url1:'"https://v1.itooi.cn"',
  url2:'"https://v1.itooi.cn"',
})
