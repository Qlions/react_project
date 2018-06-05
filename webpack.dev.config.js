// const path = require('path');
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// var webpack = require("webpack");
// module.exports = {
    
//     // 配置入口
//     entry: {
        
//        app: [
//         "react-hot-loader/patch",
//         // 入口文件
//         path.join(__dirname, "./src/index.js")
//        ],
//        vendor: ["react", "react-router-dom", 'redux', "react-dom", "react-redux"]
       
// },
   
    
//     // 输出到dist文件夹 输出名字问bundle.js
//     output: {
//         path: path.join(__dirname, "./dist"),
//         // 打包添加hash 名字
//         filename: "[name].[hash].js",
//         // 打包 改名字为 文件名字
//         chunkFilename: '[name].[chunkhash].js'
//     },
    
//     module: {
//         // 编译js/css/img
//         rules: [{
//             test: /\.js$/,
//             use: ["babel-loader?cacheDirectory=true"],
//             include: path.join(__dirname, "src")
//         },
//         {
//             test: /\.css$/,
//             use: ["style-loader", "css-loader"]
//         },
//         {
//             test: /\.(png|jpg|gif)$/,
//             use: [{
//                 loader: 'url-loader',
//                 options: {
//                     limit: 8192
//                 }
//             }]
//         }
//     ]
//     },

//     //webpack-dev-server
//     devServer: {
//         contentBase: path.join(__dirname, "./dist"),
//         //404返回
//         historyApiFallback: true
//     },

//     // 路径别名配置
//     resolve: {
//         alias: {
//             pages: path.join(__dirname, "src/pages"),
//             component: path.join(__dirname, "src/component"),
//             router: path.join(__dirname, "src/router")
//         }
//     },

//     //添加报错信息
//     devtool: "inline-source-map",

//     //更改index.html 路径 配合 缓存
//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: "index.html",
//             template: path.join(__dirname, "src/index.html")
//         }),
//         new webpack.optimize.CommonsChunkPlugin({
//             name: "vendor"
//         }),
// ]
    
// }


const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            "babel-polyfill",
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);