'use strict';

const webpack = require('webpack');
const path = require('path');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const config = {
	entry: './src/main.ts',
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
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
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
		}),
		new HTMLWebpackPlugin({
			title: 'Angular2 with ES2015 & Typescript • TodoMVC',
			template: './src/index.ejs',
			filename: 'index.html'
		}),
		new ExtractTextPlugin({
			filename: 'styles.css'
		}),
		new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, 'src') // location of your Client
        )
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

if(ENV === 'production') {
	config.plugins.push(new OptimizeCssAssetsPlugin());
}

module.exports = config;
