const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require("mini-css-extract-plugin");
const version = require('./package.json').version;

const sassLoader = [
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
    {
        loader: CssExtractPlugin.loader,
        options: {
            esModule: false,
        },
    },
    'css-loader',
];

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

const plugins = [
    new webpack.BannerPlugin({
        banner: `/*!
* Vue MDBootstrap v${version}
* Released under the BSD-3 License.
*/\n
`,
        raw: true,
        entryOnly: true,
    }),
];

const baseConfig = {
    context: path.resolve('./'),
    entry: {
        'vue-mdb': './src/index.ts',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".scss", ".css"],
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
                test: /\.(js|jsx)?$/,
                use: babelLoader,
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};

module.exports = {
    ...baseConfig,
    plugins: plugins,
    output: {
        library: {
            name: 'VueMdb',
            type: 'umd2',
        },
        globalObject: 'this',
        clean: false,
        pathinfo: false,
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
}
