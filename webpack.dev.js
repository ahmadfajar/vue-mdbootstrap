const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.base.js');

const devConfig = {
    mode: 'none',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BABEL_ENV': JSON.stringify('development'),
        }),
        new CssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    output: {
        filename: '[name].js',
    },
};

module.exports = merge(baseConfig, devConfig);
