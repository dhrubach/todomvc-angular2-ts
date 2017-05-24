'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'ts-loader' }
				]
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'tslint-loader',
				enforce: 'pre',
				options: {
					formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
					formatter: 'grouped'
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',  // transpiles .js files using babel
			},
			{
				test: /\.html$/,
				use: 'raw-loader' // returns contents of a file as a string
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module) {
				return module.context && module.context.indexOf('node_modules') > -1;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		})
	],
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
