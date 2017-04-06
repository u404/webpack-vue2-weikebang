var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

//运行时
module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/static_build',
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: './'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.template.html'
        }),
        new ExtractTextPlugin('[name].css?[contenthash]'),      //静态页测试配置
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(["css-loader", "postcss-loader"])
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                include: [
                    path.resolve(__dirname,'src','assets','css','iconfont')
                ],
                loader: 'file-loader?name=/css/iconfont/[name].[ext]'
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|jpe?g|png|gif|ico)$/,
                loaders: [
                    //小于10KB的图片会自动转成dataUrl，
                    'url-loader?limit=10000&name=/css/images/[name].[ext]',
                    //'image-loader?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}',
                ],
                include:[
                    path.resolve(__dirname,'src','assets','css','images')
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }
};