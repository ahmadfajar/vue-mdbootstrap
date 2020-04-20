const path                 = require('path');
const webpack              = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin         = require("terser-webpack-plugin");
const VueLoaderPlugin      = require('vue-loader/lib/plugin');

const babelLoader = [{
    loader: "babel-loader",
    options: {
        presets: [
            ["@babel/preset-env"]
        ],
        plugins: [
            ['@babel/plugin-transform-runtime', { "corejs": 3 }]
        ]
    }
}];

const sassLoader = [
    'vue-style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
];

const cssLoader = [
    'vue-style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
];

const libResolve = {
    extensions: [".js", ".jsx", ".vue", ".scss", ".css"],
    alias: {
        'vue$': path.resolve('./node_modules/vue/dist/vue.esm.js'),
    }
};

const libExternals = [
    {
        'vue': {
            root: 'vue',
            amd: 'vue',
            commonjs: 'vue',
            commonjs2: 'vue'
        },
    },
    {
        'moment': {
            root: 'moment',
            amd: 'moment',
            commonjs: 'moment',
            commonjs2: 'moment'
        },
        'vue': {
            root: 'vue',
            amd: 'vue',
            commonjs: 'vue',
            commonjs2: 'vue'
        },
    }
];

const cfgOutput = {
    library: 'VueMdb',
    path: path.resolve(__dirname, 'dist'),
};

const cfgOptimization = {
    minimizer: [
        new TerserPlugin()
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
    new MiniCssExtractPlugin({
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
    externals: libExternals[0],
    plugins: plugins,
    output: {
        ...cfgOutput,
        libraryTarget: 'umd',
        filename: '[name].bundle.js'
    }
}, {
    ...baseConfig,
    externals: libExternals[1],
    optimization: cfgOptimization,
    plugins: plugins,
    output: {
        ...cfgOutput,
        libraryTarget: 'commonjs2',
        filename: '[name].cjs.js'
    }
}];

module.exports = configs;
