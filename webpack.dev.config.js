// From AngularClass https://github.com/AngularClass/angular2-webpack-starter

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/* constants */

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8888;

var metadata = {
    baseUrl: '/',
    host: HOST,
    port: PORT,
    ENV: ENV
};
/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'eval-source-map',
    debug: true,
    // cache: false,

    // our angular app
    entry: { 'polyfills': './src/polyfills.ts', 'main': './src/boot.ts' },

    // Config for our build files
    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: prepend(['.ts','.js','.css','.html'], '.async') // ensure .async.ts etc also works
    },

    module: {
        preLoaders: [
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ root('node_modules') ] },
            // TODO(gdi2290): `exclude: [ root('node_modules/rxjs') ]` fixed with rxjs 5 beta.2 release
            { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ] }
        ],
        loaders: [
            // Support Angular 2 async routes via .async.ts
            { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },

            // Support for .ts files.
            { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },

            // Support for *.json files.
            //{ test: /\.json$/,  loader: 'json-loader' },
            { test: /\.json$/, loader: 'file?name=data/[name].[ext]'  },

            // Support for CSS as raw text
            { test: /\.css$/,   loader: 'raw-loader' },

            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")},
            { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file?name=fonts/[name].[ext]' },

            // support for .html as raw text
            { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/index.html') ] }

            // if you add a loader include the resolve file extension above
        ]
    },

    plugins: [
        new ExtractTextPlugin("main.css"),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
        // static assets
        new CopyWebpackPlugin([ { from: 'src/static/data', to: 'data' } ]),
        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        // replace
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        // contentBase: 'src/',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) { args = [args] }
    return extensions.reduce(function(memo, val) {
        return memo.concat(val, args.map(function(prefix) {
            return prefix + val
        }));
    }, ['']);
}
function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}