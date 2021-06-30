const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CssExtractPlugin = require("mini-css-extract-plugin");
const MinifyCssPlugin = require("css-minimizer-webpack-plugin");
const MinifyJsPlugin = require("terser-webpack-plugin");
const baseConfig = require('./webpack.base.js');

const babelLoader = [{
    loader: "babel-loader",
    options: {
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

const modules = {
    rules: [
        {
            test: /\.(js|jsx)?$/,
            use: babelLoader,
            exclude: /node_modules/
        },
    ],
}

const prodConfig = {
    mode: 'production',
    resolve: {
        extensions: [".js", ".jsx", ".vue", ".scss", ".css"],
    },
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
    module: modules,
    output: {
        library: {
            name: 'VueMdb',
            type: 'umd2',
        },
        globalObject: 'this',
        filename: '[name].min.js',
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

module.exports = merge(baseConfig, prodConfig);
