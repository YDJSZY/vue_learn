/**
 * Created by luwenwei on 16/12/6.
 */
var path = require('path');
var webpack = require('webpack');
var plugins = require("./plugins");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry:{
        app:path.resolve(__dirname, './app/app.js'),
        plugins_css:plugins.css,
        plugins_js:plugins.js,
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, './output/static'),
        publicPath: 'static/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            /*{
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }*/
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=../[path][name].[ext]'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('plugins_js', 'plugins_js.js'),
        new ExtractTextPlugin('plugins_css','plugins_css.css')
    ]
}