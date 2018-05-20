const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        landing: './src/front/landing.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build/assets')
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    ecma: 5,
                    ie8: true,
                    safari10: true,
                }
            })
        ]
    },
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