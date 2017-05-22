'use strict';

const webpack = require('webpack');

const config = {
	entry: './src/main.js',
	output: {
		filename: './dist/main.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'ts-loader'
					}
				]
			},
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
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	devServer: {
		historyApiFallback: true,
		inline: true,
		open: true
	},

	devtool: 'source-map'
};

module.exports = config;