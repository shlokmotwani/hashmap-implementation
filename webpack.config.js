const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'none',
    plugins: [new HtmlWebpackPlugin(
        {
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            title: 'HashMap Implementation'
        }
    )],
    devtool: 'inline-source-map',
}