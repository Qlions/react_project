// const path = require('path');

// // 每次自动把js 插入到 index.html 里面 
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var webpack = require('webpack');

// // 文件压缩
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// // 每次打包之前清理dist 文件需要的模块
// const CleanWebpackPlugin = require("clean-webpack-plugin");

// //抽取css 将css文件单独生成css文件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// module.exports = {
//     devtool: 'cheap-module-source-map',
//     entry: {
//         app: [
//             path.join(__dirname, 'src/index.js')
//         ],
//         vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
//     },
//     output: {
        
//         // 入口文件
//         path: path.join(__dirname, './dist'),
//         filename: '[name].[chunkhash].js',
//         chunkFilename: '[name].[chunkhash].js'
//     },
//     module: {
//         rules: [

//             {
//             test: /\.js$/,
//             use: ['babel-loader'],
//             include: path.join(__dirname, 'src')
//         },
//         //  {
//         //     test: /\.css$/,
//         //     use: ['style-loader', 'css-loader']
//         // },

//         //抽取css 生成单独的css 文件 
//         {
//             test: /\.css$/,
//             use: ExtractTextPlugin.extract({
//                 fallback: "style-loader",
//                 use: "css-loader"
//               })
//           },
//         //   8192 小于8k的图片转成base64
//          {
//             test: /\.(png|jpg|gif)$/,
//             use: [{
//                 loader: 'url-loader',
//                 options: {
//                     limit: 8192
//                 }
//             }]
//         }]
//     },
//     plugins: [
//         // 每次自动把js 插入到 index.html 里面 
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: path.join(__dirname, 'src/index.html')
//         }),

//         // 提取公共代码
//         new webpack.optimize.CommonsChunkPlugin({
//             name: 'vendor'
//         }),

//         // 文件压缩
//         new UglifyJSPlugin(),
//         new webpack.DefinePlugin(({
//             "process.env": {
//                 "NODE_ENV": JSON.stringify("production")
//             }
//         })),

//          // 优化缓存
//         new webpack.HashedModuleIdsPlugin(),
//         new webpack.optimize.CommonsChunkPlugin({
//             name: "runtime"
//         }),

//         //每次打包之前清空dist 文件夹
//         new CleanWebpackPlugin(["dist"]),

//         //抽取css 生成单独的css 文件 
//         new ExtractTextPlugin({
//             filename: '[name].[contenthash:5].css',
//             allChunks: true
//         })
//     ],

//     resolve: {
//         alias: {
//             // 配置路径
//             pages: path.join(__dirname, 'src/pages'),
//             component: path.join(__dirname, 'src/component'),
//             router: path.join(__dirname, 'src/router')
//         }
//     }
// };



const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*']),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        })
    ]

};

module.exports = merge(commonConfig, publicConfig);