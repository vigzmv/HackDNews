var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: false,
    debug: false,
    devtool: 'cheap-module-source-map',
    // devtool: 'eval',

    context: path.join(__dirname, 'src', 'js'),
    entry: [
        './main'
    ],
    output: {
        path: path.join(__dirname, 'docs', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true //huehuehue
            },
            output: {
                comments: false
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/)
    ],
    module: {
        loaders: [
            {
                loaders: [
                    'babel',
                ],
                test: /\.jsx?$/,
                exclude: /node_modules/
            }
        ]
    }
};
