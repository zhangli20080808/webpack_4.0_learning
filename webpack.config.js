const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const AssetsWebpackPlugin = require('assets-webpack-plugin');
const webpack = require('webpack')
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin')
//PWA  workbox-webpack-plugin


module.exports = {
    //默认是production 代码会被压缩
    mode: 'development',
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
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: './src/index.js',
        // sub: './src/index.js'
    },
    //当打包的时候遇到 lodash的时候，忽略
    // externals: ["lodash"], //也可以是对象
    // externals: {
    //     lodash :{
    //         //就是在commonjs的环境中 我们的lodash的名字必须写成  lodash 不能是下划线
    //         // commonjs:'lodash'
    //         lodash:'lodash' //页面上引入的名字必须是lodash
    //     }
    // },

    module: {
        rules: [
            //babel-loader webpack和babel做通信的一个桥梁 但并不会将代码中的es6翻译成es5 还需要借助一些其他的模块 @babel/preset-env
            //为了兼容低版本浏览器 我们还需要使用@babel-polyfill
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
                //按需去转义   如果只是写的业务代码 我们只需要引入babel-polyfill并且 配置presets 即可
                //如果是一个库项目代码的时候 要使用@babel/plugin-transform-runtime 好处 可以避免配置presets polyfill的问题
                //polyfill回污染全局环境  @babel/plugin-transform-runtime会以闭包的形式或组件去引入对应的内容，不存在全局污染的情况
                //如果 一直配置options 代码会非常长 这时候我们可以创建一个.babelrc
                //"corejs": 2, false 改为 2 ，当页面上不存在一些map promise方法的时候，才会把代码打包到我们的mian.js里面
                // presets:[["@babel/preset-env",{
                // 	//67以上的版本就忽略掉了
                // 	targets : {
                // 		chrome :"67"
                // 	},
                // 	//根据业务代码的需求去注入babel-polyfill里面对应的内容
                // 	useBuiltIns: 'usage',
                // }]]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //这种配置名字 我们叫placeholder 占位符
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240 //2048 2kb 大于 10kb images生成
                    }
                }
            },
            // 翻译顺序  从下到上 从右到左
            //当postcss-loader被使用的时候 他会有一个插件被使用 autoprefixer
            {
                test: /\.scss$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        //希望在打包的时候仍然使用所有的loader
                        options: {
                            importLoaders: 2,
                            //只在模块内有效
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'],
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: "file-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    'sass-loader',
                    'postcss-loader'],
            },

        ]
    },
    output: {
        //比如说 我打包完的js要放到云上 我需要配置一个东西 publicPath
        // publicPath: "http://cdn.com.cn",
        publicPath: "/", //加一个根路径
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        //对于库文件的打包
        // library: 'root',  //会向全局注入一个变量//
        // libraryTarget: "umd"   //通用
    },
    //plugins  可以在webpack 运行到某个时刻的时候 帮我们去做一些事情 就想生命周期函数一样
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
        //	CleanWebpackPlugin在打包之前开始运行
        , new CleanWebpackPlugin(),
        // new AssetsWebpackPlugin({
        // 	filename: 'webpack.assets.json',
        // })
        new webpack.HotModuleReplacementPlugin(),
        new WorkBoxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    devServer: {
        contentBase: './dist',
        //自动打开一个浏览器
        open: true,
        port: 8090,
        //即便是hrm的功能没有生效 我们也不让他刷新浏览器
        hot: true,
        // hotOnly: true,
        proxy: {
            '/api': 'localhost:3000'
        }
    }
};