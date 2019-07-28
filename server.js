const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const complier = webpack(config)
const app  = express()


app.use(WebpackDevMiddleware(complier,{
    publicPath: config.output.publicPath
}))


app.listen(3000,()=>{
    console.log('傻瓜傻瓜')
})