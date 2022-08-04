const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const version = require('./package.json').version;

const sassLoader = [
    'vue-style-loader',
    {
        loader: CssExtractPlugin.loader,
        options: {
            esModule: false,
        },
    },
    'css-loader',
    'sass-loader',
];

const cssLoader = [
    'vue-style-loader',
    {
        loader: CssExtractPlugin.loader,
        options: {
            esModule: false,
        },
    },
    'css-loader',
];

const plugins = [
    new webpack.BannerPlugin({
        banner: `/*!
* Vue MDBootstrap v${version}
* Released under the BSD-3 License.
*/ `,
        raw: true,
        entryOnly: true,
    }),
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
    }),
];

const baseConfig = {
    context: path.resolve('./'),
    entry: {
        'vue-mdb': './src/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader
            },
            {
                test: /\.s[ac]ss$/,
                use: sassLoader
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
        ],
    },
};

module.exports = {
    ...baseConfig,
    plugins: plugins,
    output: {
        clean: true,
        pathinfo: false,
        path: path.resolve(__dirname, 'dist'),
    },
}
