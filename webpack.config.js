/* eslint-disable no-path-concat */
const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');
const path = require('path');
// var glob = require('glob');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const config = {
	mode: process.env.NODE_ENV,
	devtool: 'inline-source-map',
	context: __dirname + '/src',
	entry: {
		background: './background/index.ts',
		popup: './popup/popup.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '/src'),
		},
		extensions: ['.js', '.vue', '.ts', '.css'],
	},
	module: {
		rules: [
			{
				loader: 'ts-loader',
				test: /\.ts$/,
				exclude: [/node_modules/],
				options: {
					configFile: 'tsconfig.json',
				},
			},
			{
				test: /\.vue$/,
				loaders: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.sass$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: '/images/',
					emitFile: false,
				},
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'url-loader',
			},
		],
	},

	plugins: [
		new ChromeExtensionReloader(),
		new webpack.DefinePlugin({
			global: 'window',
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new CopyWebpackPlugin([
			{ from: 'icons', to: 'icons', ignore: ['icon.xcf'] },
			{ from: 'popup/index.html', to: 'popup/index.html' },
			{ from: 'popup/css/uikit-rtl.min.css', to: 'popup/css/uikit-rtl.min.css' },
			{ from: 'popup/css/uikit.min.css', to: 'popup/css/uikit.min.css' },
			{
				from: 'manifest.json',
				to: 'manifest.json',
				transform: content => {
					const jsonContent = JSON.parse(content);
					jsonContent.version = version;

					if (config.mode === 'development') {
						jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
					}

					return JSON.stringify(jsonContent, null, 2);
				},
			},
		]),
	],
};

if (config.mode === 'production') {
	config.plugins = (config.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
	]);
}

if (process.env.HMR === 'true') {
	config.plugins = (config.plugins || []).concat([
		new ExtensionReloader({
			manifest: __dirname + '/src/manifest.json',
		}),
	]);
}

function transformHtml(content) {
	return ejs.render(content.toString(), {
		...process.env,
	});
}

module.exports = config;
