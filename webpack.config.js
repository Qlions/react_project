const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// 每次打包之前清理dist 文件需要的模块
const CleanWebpackPlugin = require("clean-webpack-plugin");

//抽取css 将css文件单独生成css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        },
        //  {
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader']
        // },

        //抽取css 生成单独的css 文件 
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader"]
            })
          },
         {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin(({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "runtime"
        }),
        //每次打包之前清空dist 文件夹
        new CleanWebpackPlugin(["dist"]),

        //抽取css 生成单独的css 文件 
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        })
    ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router')
        }
    }
};