'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"/"',
    // BASE_API: '"http://ddd.test"'
    // BASE_API: '"http://192.168.1.200"'
})
