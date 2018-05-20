let path = require('path');
let webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        landing: './src/front/landing.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build/assets')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};