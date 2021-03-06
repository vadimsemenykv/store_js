const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    mode: "production",
    entry: {
        landing: './src/front/landing.js',
        login: './src/front/login.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build/assets')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        // new CompressionPlugin({
        //     algorithm: 'gzip'
        // })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    ecma: 5,
                    ie8: true,
                    safari10: true,
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        // splitChunks: {
        //     chunks: "all",
        //     minSize: 30000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     name: true,
        //     cacheGroups: {
        //         vendor: {
        //             chunks: 'initial',
        //             name: 'vendor',
        //             test: 'vendor',
        //             enforce: true
        //         },
        //         // vendors: {
        //         //     test: /[\\/]node_modules[\\/]/,
        //         //     priority: -10,
        //         //     name: "vendor",
        //         //     chunks: "all",
        //         //     minChunks: 4
        //         // },
        //         // default: {
        //         //     minChunks: 2,
        //         //     priority: -20,
        //         //     reuseExistingChunk: true,
        //         //     name: "common"
        //         // }
        //     }
        // }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.(css|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
            // {
            //     test: /\.css$/,
            //     loader:	"style-loader!css-loader!postcss-loader"
            // }
        ]
    }
};