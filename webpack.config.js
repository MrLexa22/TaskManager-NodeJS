const webpack = require('webpack');
const mysql = require("mysql2");
module.exports = {
    mode: "development",
    resolve: {
        alias: {
            process: "process/browser"
        },

        fallback: {
            "path": require.resolve("path-browserify"),
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "assert": require.resolve("assert/"),
            "fs": false,
            "util": false
        },
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]
}