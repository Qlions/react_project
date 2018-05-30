const path = require('path');

module.exports = {
    
    // 配置入口
    entry: [
        "react-hot-loader/patch",
        path.join(__dirname, "./src/index.js")
    ],

    // 输出到dist文件夹 输出名字问bundle.js
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            use: ["babel-loader?cacheDirectory=true"],
            include: path.join(__dirname, "src")
        }]
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
    }
    
}

