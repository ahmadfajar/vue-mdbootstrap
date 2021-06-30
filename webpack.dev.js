const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.base.js');

const babelLoader = [{
    loader: "babel-loader",
    options: {
        comments: false,
        presets: [
            ["@babel/preset-env", {
                targets: {
                    browsers: [
                        "> 5%",
                        "last 2 versions",
                        "not ie <= 9"
                    ]
                },
                modules: 'commonjs',
            }],
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', {"corejs": 3}]
        ],
    }
}];

const modules = {
    rules: [
        {
            test: /\.(js|jsx)?$/,
            use: babelLoader,
            exclude: /node_modules/
        },
    ],
}

const devConfig = {
    mode: 'none',
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".scss", ".css"],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BABEL_ENV': JSON.stringify('development'),
        }),
        new CssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    module: modules,
    output: {
        library: {
            name: 'VueMdb',
            type: 'umd2',
        },
        globalObject: 'this',
        filename: '[name].js',
        pathinfo: false,
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
};

module.exports = merge(baseConfig, devConfig);
