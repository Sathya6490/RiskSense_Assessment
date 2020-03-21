const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
           test : /\.s[a|c]ss$/i,
           loader: [
             // Creates `style` nodes from JS strings
             'style-loader',
             // Translates CSS into CommonJS
             'css-loader',
             // Compiles Sass to CSS
             'sass-loader',
           ],
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html',
      })
   ]
}