'use strict';

const webpack = require('webpack');

const config = {
	entry: './app/main.js',
	output: {
		filename: 'main.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',  // transpiles .js files using babel
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: 'raw-loader' // returns contents of a file as a string
			}
		]
	},

	devServer: {
		historyApiFallback: true,
		inline: true,
		open: true
	},

	devtool: 'source-map'
};

module.exports = config;