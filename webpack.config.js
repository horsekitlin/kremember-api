var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var nodeModulePath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public');

var source = {
    login : path.resolve(__dirname, "client_source", "pages", "login.js"),
    home : path.resolve(__dirname, "client_source", "pages", "home.js"),
    createmember : path.resolve(__dirname, "client_source", "pages", "createmember.js"),
};

//create pages
var plugins = [];
var keys = Object.keys(source);

keys.map(function(key){
    plugins.push(
        new HtmlWebpackPlugin({
            title : key,
            javascript : "js/" + key + ".js",
            template : './layout/index.html',
            filename : key + '.html',
        }));
});

plugins.push(
    new webpack.ProvidePlugin({
        $ : 'jquery',
        jquery : 'jquery',
        _ : 'lodash',
        React: 'react',
        Promise : 'bluebird',
        ReactDOM : 'react-dom'
  })
);

var config = {
  devtool: 'eval',
  src : ['webpack-dev-server/client?http://localhost:8080']
};

config.entry= source;

config.output= {
    path: path.join(__dirname, "public"),
    filename: 'js/[name].js',
};

config.module = {};
config.module.loaders= [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: [nodeModulePath]
  },
  {
    test: /\.css$/,
    loader: 'style!css'
  },
  {
    test: /\.scss$/,
    loader: 'style!css!sass'
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=100000'
  }
        ];

config.plugins= plugins;

module.exports = config;
