const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin');


module.exports = {
	//默认是production 代码会被压缩
	mode: 'development',
	entry: {
		main: './src/index.js',
		// sub: './src/index.js'
	},
	module: {
		rules: [
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
						loader:'css-loader',
						//希望在打包的时候仍然使用所有的loader
						options: {
							importLoaders:2,
							//只在模块内有效
							modules:true
						}
					},
					'sass-loader',
					'postcss-loader'],
			},
			{
				test: /\.(eot|ttf|svg)$/,
				use:{
					loader: "file-loader"
				}
			}

		]
	},
	output: {
		//比如说 我打包完的js要放到云上 我需要配置一个东西 publicPath
		// publicPath: "http://cdn.com.cn",
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	//plugins  可以在webpack 运行到某个时刻的时候 帮我们去做一些事情 就想生命周期函数一样
	plugins: [
		new HtmlWebpackPlugin({
		template: "src/index.html"
	})
	//	CleanWebpackPlugin在打包之前开始运行
	,new CleanWebpackPlugin(),
	// new AssetsWebpackPlugin({
	// 	filename: 'webpack.assets.json',
	// })
	]
};