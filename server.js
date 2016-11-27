/// <reference path="node_modules/@types/node/index.d.ts"/>
var WebPackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var compiler = webpack(config);

var server = new WebPackDevServer(compiler, {
    hot: true,
    // display no info to console (only warnings and errors)
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      // With console colors
      colors: true,
      // add the hash of the compilation
      hash: true,
      // add webpack version information
      version: false,
      // add timing information
      timings: true,
      // add assets information
      assets: false,
      // add chunk information
      chunks: false,
      // add built modules information to chunk information
      chunkModules: false,
      // add built modules information
      modules: false,
      // add also information about cached (not built) modules
      cached: false,
      // add information about the reasons why modules are included
      reasons: false,
      // add the source code of modules
      source: false,
      // add details to errors (like resolving log)
      errorDetails: true,
      // add the origins of chunks and chunk merging info
      chunkOrigins: false,
      // Add messages from child loaders
      children: false
    }
});

server.listen(config.production.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("I'm listening on", config.production.port, "but wait for me to build first");
})