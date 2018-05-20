const path = require('path');
const webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: {
        landing: './src/front/landing.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        rules: [{
            test: /.js$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
};