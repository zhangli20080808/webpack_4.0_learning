const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
        // sub: './src/index.js'
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
                    //url-loader生成的图片直接放到了bundle里面
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
            //图片文件处理
            // {
            //     test: /\.(jpg|png|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             //placeholder 占位符 ext原始文件的后缀 打包出来的hash值
            //             name:'[name]_[hash].[ext]',
            //             outputPath:'images/'
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                use: ['style-loader',
                    'sass-loader',
                    'postcss-loader'],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
        //	CleanWebpackPlugin在打包之前开始运行
        , new CleanWebpackPlugin(),
    ]
}
