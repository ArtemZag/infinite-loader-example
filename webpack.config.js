var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		//new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({ $: "jquery/dist/jquery.js", jQuery: "jquery/dist/jquery.js" })
	],
	module: {
		loaders: [{
				test: /\.js$|\.jsx$/,
				loaders: [ 'babel' ],
				exclude: /node_modules/,
				include: __dirname
			}, {
				test: /\.css?$/,
				loaders: [ 'style', 'raw' ],
				include: __dirname
			}
		]
	},
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.jsx', '.json', '.scss'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules')
		]
	},

	postcss: [ autoprefixer({ browsers: ['ie >= 10'] }) ]
}


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src')
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
var fs = require('fs')
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
	// Resolve Redux to source
	module.exports.resolve = { alias: { 'redux': reduxSrc } }
	// Compile Redux from source
	module.exports.module.loaders.push({
		test: /\.js$|\.jsx$/,
		loaders: [ 'babel' ],
		include: reduxSrc
	})
}
