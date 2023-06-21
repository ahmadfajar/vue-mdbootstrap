const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CssExtractPlugin = require("mini-css-extract-plugin");
const MinifyCssPlugin = require("css-minimizer-webpack-plugin");
const MinifyJsPlugin = require("terser-webpack-plugin");
const baseConfig = require('./webpack.base.js');

const cfgOptimization = {
    minimizer: [
        new MinifyJsPlugin(),
        new MinifyCssPlugin(),
    ],
    splitChunks: {
        cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
            }
        }
    }
};

const prodConfig = {
    mode: 'production',
    optimization: cfgOptimization,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BABEL_ENV': JSON.stringify('production'),
        }),
        new CssExtractPlugin({
            filename: '[name].min.css'
        }),
    ],
    output: {
        filename: '[name].min.js',
    },
};

module.exports = merge(baseConfig, prodConfig);
