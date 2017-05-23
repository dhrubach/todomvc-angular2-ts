'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.bundle.js'
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
				test: /\.ts$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: {
					formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
					formatter: 'grouped'
				}
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

	devtool: 'cheap-module-source-map'
};

module.exports = config;
