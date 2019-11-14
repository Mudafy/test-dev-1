var path = require('path');
var webpack = require('webpack');
var path = require("path");
var qs = require("querystring");

module.exports = {
    devtool: 'source-map', //for development
    // location of your main js file
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, 'client', 'index.jsx'),
    ],

    output: {
        path: path.join(__dirname, "/app/public/"), //Where to place Final Compiled js
        publicPath: '/public/',
        filename: "bundle.js",    //Name of compiled js
    },

    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.jsx?$/,
                query: {
                    "env": {
                        "development": {
                            "presets": ["react-hmre"],
                            "plugins": [
                                ["react-transform", {
                                    "transforms": [{
                                        "transform": "react-transform-hmr",
                                        "imports": ["react"],
                                        "locals": ["module"]
                                    }]
                                }]
                            ]
                        }
                    },
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'client'),
                loader: 'style-loader!css-loader?' + qs.stringify({
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path][name]-[local]'
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]

}
