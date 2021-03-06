const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        landing: './src/front/landing.js',
        login: './src/front/login.js',
        registration: './src/front/registration.js',
        //
        'account-status-and-notifications': './src/front/account-status-and-notifications.js',
        'my-account': './src/front/my-account.js',
        'my-orders': './src/front/my-orders.js',
        'my-contracts': './src/front/my-contracts.js',
        'my-offers': './src/front/my-offers.js',
        //
        catalog: './src/front/catalog.js',
        'catalog-orders-create': './src/front/catalog-orders-create.js',
        'catalog-contracts-create': './src/front/catalog-contracts-create.js',
        'catalog-offers-create': './src/front/catalog-offers-create.js',
        'catalog-offers-accept': './src/front/catalog-offers-accept.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build/assets')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
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
                    'css-loader',
                    'sass-loader'
                ]
            }
            // {
            //     test: /\.sass/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         "sass-loader"
            //     ]
            // }
            // {
            //     test: /\.css$/,
            //     loader:	"style-loader!css-loader!postcss-loader"
            // }
        ]
    }
};
