import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import store from "./redux/store";

import {BrowserRouter as Router} from 'react-router-dom';
import App from "components/App/App"

// 初始化
renderWithHotReload(App);

//当修改代码时候 浏览器不会刷新， 只会更新自己修改的那一块
// 热更新
if(module.hot){
    module.hot.accept( "components/App/App", () => {
        const NextApp = require("components/App/App").default;
        renderWithHotReload(NextApp);
    });
}

function renderWithHotReload(RootElement){
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <RootElement/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}