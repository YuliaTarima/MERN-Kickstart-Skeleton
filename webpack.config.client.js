const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    // sets process.env.NODE_ENV to the given value
    // and tells Webpack to use its built-in optimizations accordingly.
    // If not explicitly set, it defaults to the value 'production'.
    // can also be set via the command line
    // by passing the value as a CLI argument.
    devtool: 'eval-source-map',
    // specifies how source maps are generated, if at all.
    // Generally, a source map provides a way
    // of mapping code within a compressed file
    // back to its original position in a source file to aid debugging.
    entry: [
        // specifies the entry file where Webpack starts bundling,
        // in this case with the App.js file in the client folder.
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/App.js')
    ],
    output: {
        // specifies the output path for the bundled code,
        // in this case, set to dist/bundle.js.
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/' // allows specifying the base path for all assets in the application
    },
    module: {
        // sets the regex rule for the file extension to be used for transpilation,
        // and the folders to be excluded.
        // The transpilation tool to be used here is babel loader.
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enables hot module replacement for react hot-loader.
        new webpack.NoEmitOnErrorsPlugin() // allows skip emitting on compile errors.
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
}

module.exports = config
