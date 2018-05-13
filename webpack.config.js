let	path	=	require('path');
let	webpack	=	require('webpack');

module.exports	=	{
    devtool:	'cheap-module-eval-source-map',
    entry:	[
        'webpack-hot-middleware/client',
        './src/front/landing'
    ],
    output:	{
        path:	path.join(__dirname,	'dist'),
        filename:	'landing.js',
        publicPath:	'/static/'
    },
    plugins:	[
        new	webpack.optimize.OccurenceOrderPlugin(),
        new	webpack.HotModuleReplacementPlugin(),
        new	webpack.NoErrorsPlugin()
    ]
};