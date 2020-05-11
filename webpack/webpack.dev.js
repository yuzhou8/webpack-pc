const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode:"development",
    devtool: 'inline-source-map',  //追踪出错时，错误所在的源文件和行数
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'public': path.resolve(__dirname, '../src/public'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    devServer:{  //webpack-dev-server 服务器地址：localhost:8080
        contentBase: path.join(__dirname,'dist'),
        compress: true,  //响应的文件做gzip 压缩
        // host:"0.0.0.0",  //指定主机地址
        port:8888,    //指定端口
        hot:true,     //热更新
        proxy:{
            "/api1":{
                target:"localhost:8822",  //当访问/api1时，会跳到localhost:8822/api1
                secure: false,  //可以访问https类型
            },
            "/api2":{
                target:"localhost:8822",  //当访问/api1时，会跳到localhost:8822/api2
                secure: false,  //可以访问https类型
            },
        },
    },
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'/'
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),    //热更新时，显示更新的文件名
        new webpack.HotModuleReplacementPlugin(),  //启动热更新，仅限开发模式使用
        new HtmlWebpackPlugin({
            filename:'index.html', //生成的文件名
            template:'./src/index.html',  //来源文件的路径
            injekt:true,  //css和js文件插在html文件哪个位置，分别有true|'body'|'head'|false,true和body是插在html的body内的最底
            // favicon:'./logo.jpg', //网站图标的路径
            chunks:['main'],  //仅插入指定的js文件到html中
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
                loader: "babel-loader"
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule:false
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
                            esModule:false
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
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