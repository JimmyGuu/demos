const HtmlWebpackPlugin = require('html-webpack-plugin'); // 需要通过npm安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
    // 入口
    entry: './path/to/my/entry/main.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        // 加载器
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    // 插件
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;