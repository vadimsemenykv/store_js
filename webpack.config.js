let path = require('path');
let webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/front/landing'
    ],
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: 'landing.js'
    }
};