/// <reference path="node_modules/@types/node/index.d.ts"/>

var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var path = require("path");

var devConfig = new Config().extend("webpack.dev.config");

var configExtension = {
    // Add overrides here for electron
    module: {
        loaders: [
            { test: /\.js$/, loader: "script", include: path.resolve(path.join(__dirname, 'App', 'Globals', 'Legacy', 'prereqs')) },
            { test: /\.ts(x?)$/, loaders: ['react-hot', 'babel?presets[]=es2015-loose&compact=true', 'ts-loader?configFileName=tsconfig.webpack.json'], include: path.resolve(__dirname, "App") },
            { test: /\.css$/, exclude: /\.import\.css$/,  loader: "style!css!postcss-loader", include: path.resolve(__dirname, "App") },
            { test: /\.import\.css$/,  loader: "style!css!postcss-loader", include: path.resolve(__dirname, "App") },
            { test: /\.less$/, exclude: /(\.module|\.electron)\.less$/, loader: "style!css!postcss-loader!less", include: path.resolve(__dirname, "App") },
            {
                test: /(\.module|\.electron)\.less$/,
                loader: "style!css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less",
                include: path.resolve(__dirname, "App")
            },
            { test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif|ico)$/, loader: "file-loader?name=[name].[ext]" }
        ],
    },

    plugins: [
        // Used for hot-reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/io\.branch\.sdk/),
        new webpack.DefinePlugin({ DEBUG: true, ELECTRON: true })
    ]
};

devConfig.module.loaders = [];
devConfig.plugins = [];

module.exports = devConfig.merge(configExtension);
