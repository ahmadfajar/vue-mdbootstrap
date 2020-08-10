const path             = require('path');
const webpack          = require('webpack');
const CssExtractPlugin = require("mini-css-extract-plugin");
const MinifyCssPlugin  = require("optimize-css-assets-webpack-plugin");
const MinifyJsPlugin   = require("terser-webpack-plugin");
const VueLoaderPlugin  = require('vue-loader/lib/plugin');

const babelLoader = [{
    loader: "babel-loader",
    options: {
        presets: [
            ["@babel/preset-env"]
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', {"corejs": 3}]
        ]
    }
}];

const sassLoader = [
    'vue-style-loader',
    CssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
];

const cssLoader = [
    'vue-style-loader',
    CssExtractPlugin.loader,
    'css-loader',
];

const libResolve = {
    extensions: [".js", ".jsx", ".vue", ".scss", ".css"],
    alias: {
        'vue$': path.resolve('./node_modules/vue/dist/vue.esm.js'),
    }
};

const cfgOptimization = {
    minimizer: [
        new MinifyJsPlugin(),
        new MinifyCssPlugin()
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

const baseConfig = {
    mode: 'production',
    context: path.resolve('./'),
    entry: {
        'vue-mdb': './src/index.js',
    },
    resolve: libResolve,
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: babelLoader,
                exclude: /node_modules/
            },
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
        ]
    }
};

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: baseConfig.mode !== 'production' ? '"development"' : '"production"',
            BABEL_ENV: baseConfig.mode !== 'production' ? '"development"' : '"production"',
            PRODUCTION: baseConfig.mode === 'production'
        }
    }),
    new VueLoaderPlugin(),
    new CssExtractPlugin({
        filename: '[name].css'
    }),
    new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
    })
];

const configs = [{
    ...baseConfig,
    optimization: cfgOptimization,
    plugins: plugins,
    output: {
        library: 'VueMdb',
        libraryTarget: 'umd',
        filename: '[name].bundle.umd.js',
        path: path.resolve(__dirname, 'dist')
    }
}, {
    ...baseConfig,
    optimization: cfgOptimization,
    plugins: plugins,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}];

module.exports = configs;
