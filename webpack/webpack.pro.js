const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode:"production",
    // devtool: 'source-map',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'public': path.resolve(__dirname, '../src/public'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    optimization: {
        runtimeChunk:{
            name:'manifest'  //提取 记录模块文件索引的文件
        },
        splitChunks: {
            chunks: 'initial',
            /*'all'|'async'|'initial',
            all拆分异步和同步文件里引入的模块，
            async拆分异步文件里引入的模块，
            initial拆分同步文件里引入的模块*/
            minSize: 30000,
            minChunks: 1,  //当模块被引用1次，就被提取出来
            maxAsyncRequests: 5,   //拆分异步文件里的模块，拆分成的模块文件数量不能超过5个
            maxInitialRequests: 3,  //拆分同步文件里的模块，拆分成的模块文件数量不能超过3个
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {  //将node_modules引入的所有第三方模块，提取到vendors.js文件
                    name:"vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10   //权重值
                },
                common: {  //重用的模块，提取到common.js文件
                    name:"commom",
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,  //当非node_modules里的模块被引用达到2次时，提取到common.js文件
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename:'js/[name].[chunkhash].js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/'
    },
    plugins:[
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({  //提取出css文件
            filename: 'css/[name].[chunkhash].css',
            chunkFilename: 'css/[id].css',
        }),
        new UglifyJSPlugin({   //压缩代码
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') //设置代码环境为生产环境
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html', //生成的文件名
            template:'./src/index.html',  //来源文件的路径
            injekt:true,  //css和js文件插在html文件哪个位置，分别有true|'body'|'head'|false,true和body是插在html的body内的最底
            // favicon:'./logo.jpg', //网站图标的路径
            chunks:['manifest','vendors','common','main'],  //仅插入指定的js文件到html中
            // excludeChunks:["bb"],  //插入除了bb.js的其他js到html中
            minify:{    //压缩html文件
                removeComments:true,//删除html文件中的注释
                collapseWhitespace:true,//删除html文件中的空格
            }
        }),

    ],
    module:{
        rules:[
						{
							test: /\.(js|vue)$/,
							loader: 'eslint-loader',
							enforce: 'pre',
							include: [ path.join(__dirname,'../','src') ],
							options: {
								fix:true,
								emitWarning:true
							}
						},
            {
                test:/\.(html|ejs)$/,
                use:['ejs-loader']
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.css$/,
                use:[
					{
						loader:MiniCssExtractPlugin.loader,
						options:{
							// publicPath:'../',
						}
					},
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                    	loader:MiniCssExtractPlugin.loader,
                    	options:{
                    		// publicPath:'../',
                    	}
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
													limit: 3072,
													esModule:false,
													name:'img/[name][hash].[ext]'
                        }
                    },
										{
											loader:'image-webpack-loader',
											options:{
												 bypassOnDebug: true
											}
										}
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule:false,
                            name:'media/[name][hash].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'font/[name][hash].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            }
        ]
    }
}