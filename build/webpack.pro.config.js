// const path = require('path');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const AssetsWebpackPlugin = require('assets-webpack-plugin');
// const webpack = require('webpack')
// const WorkBoxWebpackPlugin = require('workbox-webpack-plugin')
//PWA  workbox-webpack-plugin


prodConfig = {
    //默认是production 代码会被压缩
    mode: 'production',
    //开发者模式 我们的sourceMap已经被配置进去了  告诉我们源代码里面的哪一行出错了
    //SourceMap 的配置
    // 开发者模式  默认SourceMap已经配置进去了  关掉 devtool : ’none’ 需要你告诉我开发文件中的哪一行错了 而不是打包后的
    // 比如 现在知道dist目录下的main.js 98行粗错啦
    // SourceMap 一个映射关系 他知道dist目录下的main.js的98行 实际上对应的是src目录下的index.js文件中的第一行
    // 线上环境出问题 我们相应的映射文件 生成错误的时候只带行信息 不带列信息 devtool source-map 打包的速度是会变慢的 加了cheap 会快些 构建映射关系
    // 如果还想考虑第三方模块里面的 错误 映射关系 可以用 cheap-module-inline-source-map eval是打包速度最快的一种方式
    // 如果比较复杂 用eval提示的可能并不全面 如果有inline 会把打包生成的文件扔到main.js里面
    // 线上代码的devtool怎么配置呢
    // development devtool: "cheap-module-eval-source-map",
    // production devtool: "cheap-module-source-map",
    devtool: "cheap-module-source-map",
    //当打包的时候遇到 lodash的时候，忽略
    // externals: ["lodash"], //也可以是对象
    // externals: {
    //     lodash :{
    //         //就是在commonjs的环境中 我们的lodash的名字必须写成  lodash 不能是下划线
    //         // commonjs:'lodash'
    //         lodash:'lodash' //页面上引入的名字必须是lodash
    //     }
    // },
};

module.exports = merge(commonConfig,prodConfig)