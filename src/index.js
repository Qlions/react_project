import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import store from "./redux/store";


import getRouter from "router/router";
// import Hello from "./components/Hello/Hello"

// 初始化
renderWithHotReload(getRouter());

//当修改代码时候 浏览器不会刷新， 只会更新自己修改的那一块
// 热更新
if(module.hot){

    
    module.hot.accept( "./router/router", () => {
        const getRouter = require("./router/router").default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement){
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}