const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
module.exports = {
    
    // 配置入口
    entry: {
        
       app: [
        "react-hot-loader/patch",
        // 入口文件
        path.join(__dirname, "./src/index.js")
       ],
       vendor: ["react", "react-router-dom", 'redux', "react-dom", "react-redux"]
       
},
   
    
    // 输出到dist文件夹 输出名字问bundle.js
    output: {
        path: path.join(__dirname, "./dist"),
        // 打包添加hash 名字
        filename: "[name].[hash].js",
        // 打包 改名字为 文件名字
        chunkFilename: '[name].[chunkhash].js'
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            use: ["babel-loader?cacheDirectory=true"],
            include: path.join(__dirname, "src")
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }
    ]
    },

    //webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        //404返回
        historyApiFallback: true
    },

    // 路径别名配置
    resolve: {
        alias: {
            pages: path.join(__dirname, "src/pages"),
            component: path.join(__dirname, "src/component"),
            router: path.join(__dirname, "src/router")
        }
    },

    //添加报错信息
    devtool: "inline-source-map",

    //更改index.html 路径 配合 缓存
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src/index.html")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
]
    
}

