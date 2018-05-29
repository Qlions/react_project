const path = require('path');

module.exports = {
    
    // 配置入口
    entry: path.join(__dirname, "./src/index.js"),

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
    }
}
