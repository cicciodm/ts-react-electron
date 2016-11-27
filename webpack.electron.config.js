/// <reference path="node_modules/@types/node/index.d.ts"/>

var webpack = require('webpack');
var { Config } = require('webpack-config');
var path = require("path");

var mainConfig = new Config().extend("webpack.config");

var nodeModulesPath = path.join(__dirname, 'node_modules');
var isProduction = process.env.NODE_ENV == "production";

var configExtension = {
    // Add overrides here for electron
    output: {
        // This is only used if running 'webpack' directly on cmd line. See PulseNext.csproj for path used during msbuild
        path: path.join(__dirname, 'objd'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "script", include: [path.resolve(path.join(__dirname, 'App', 'Globals', 'Legacy', 'prereqs')), new RegExp('pulsemvvmonly\.js')] },
            // TODO remove crazy require when https://github.com/babel/babel-loader/issues/166 is fixed.
            {
                test: /\.ts(x?)$/,
                loader: 'babel?cacheDirectory,plugins[]=' + require.resolve(path.join(nodeModulesPath, 'babel-plugin-external-helpers-2')) +
                    ',presets[]=' + require.resolve(path.join(nodeModulesPath, 'babel-preset-es2015-loose')) +
                    '!ts-loader?configFileName=tsconfig.webpack.json',
                include: path.resolve(__dirname, "App") },
            { test: /\.css$/, exclude: /\.import\.css$/,  loader: "style-loader!css-loader?-minimize!postcss-loader", include: path.resolve(__dirname, "App") },
            { test: /\.import\.css$/,  loader: "style!css?-minimize!postcss-loader", include: path.resolve(__dirname, "App") },
            { test: /\.less$/, exclude: /(\.module|\.electron)\.less$/, loader: "style-loader!css-loader?-minimize!postcss-loader!less-loader?-compress", include: path.resolve(__dirname, "App") },
            {
                test: /(\.module|\.electron)\.less$/,
                loader: "style-loader!css-loader?-minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less-loader?-compress",
                include: path.resolve(__dirname, "App")
            },
            { test: /\.(jpg|png|woff|eot|ttf|svg|gif|ico)$/, loader: "file-loader?name=[name]_[hash].[ext]", include: path.resolve(__dirname, "App") },
            { test: /\.(jpg|png|woff|eot|ttf|svg|gif|ico)$/, loader: "file-loader?name=[name].[ext]", include: path.resolve(path.join(__dirname, 'Static')) },
        ]
    },

    plugins: [
        new webpack.IgnorePlugin(/io\.branch\.sdk/),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'},
            DEBUG: true,
            ELECTRON: true
        })
    ],
};

configExtension.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        dead_code: true
    }
}));

mainConfig.module.loaders = [];
mainConfig.plugins = [];

module.exports = mainConfig.merge(configExtension);
