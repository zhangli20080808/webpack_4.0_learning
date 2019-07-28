# webpack_4.0_learning
练习单页面项目配置和多页面项目配置中的各个api，插件，模块，配置


####WEBAPCK是什么   

最早呢  是JS的打包工具 到后来 任何形式的模块文件 
比如  import css from ‘./index.css’ var style = require(‘./index.css)
核心定义  模块打包工具 module bundler  可以把很多模块打包一起的一个工具
import s from ‘./‘ 是一种 ES modules 模块的引入方式 只认识import这种语句 我们把引入的这些叫模块
通过webpack给浏览做一个翻译 这个浏览器就能正确的识别 我们的代码了
2.什么是模块打包工具
CommonJs 规范   require function a {} module.exports = a
CMD
AMD
npx webpack -v 
npx会帮助我们从当前目录下的node_modules去找 webpack 
npx webpack —config webpackconfig.js
webpack-cli  使得我们可以再命令行里面去使用webpack
####核心概念  
什么是loader 就是一个打包方案 他知道对于一个特定的文件，如何打包 webpack不知道 你让loader处理就好了
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
chunks 每一个js打包生成的对应的id 
chunk name 就是entry入口对应的名字

file-loader 底层处理文件类型的时候 打包的一个流程
底层会把这个图片移到dist目录下 会得到一个图片相对于dist的一个名称 然后他会把这个名称作为一个返回值 返回给我们引入模块的变量之中

style-loader 在得到css-loader生成的css内容后 会将这段内容挂到head部分

cnpm i sass-loader node-sass -D

css样式模块化  

importLoaders:2标识  如果你页面里面还有import的css 还是要先走post’s-loader和css-loader 
css打包模块化  单个css只在模块内有效 modules:true

plugins 可以在webpack 运行到某个时刻的时候 帮我们去做一些事情 就想生命周期函数一样

html-webpack-plugin 会在打包结束后自动生成一个html文件，并把打包后生成的js自动引入到这个html文件中  想要自动得到root  需要自己添加一个模板


####SourceMap 的配置

开发者模式  默认SourceMap已经配置进去了  关掉 devtool : ’none’ 需要你告诉我开发文件中的哪一行错了 而不是打包后的 
比如 现在知道dist目录下的main.js 98行粗错啦  
SourceMap 一个映射关系 他知道dist目录下的main.js的98行 实际上对应的是src目录下的index.js文件中的第一行
线上环境出问题 我们相应的映射文件 生成错误的时候只带行信息 不带列信息

#### WebpackDevServer 提升开发效率

