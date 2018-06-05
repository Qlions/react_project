import axios from "axios"

export default store => next => action =>{
    // 如果dispatch 来的是一个function， 此处不做处理， 直接进入下一级
    if(typeof action === "function"){
        action(dispatch, getState);
        return;
    }

    // 解析action
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action;

    // 没有promise， 证明不是想要发送的ajax请求的， 直接进入下一步
    if(!action.promise){
        return next(action)
    }

    // 解析 types

    const [REQUEST,
        SUCCESS,
        FAILURE
        ] = types;

    // 开始请求的时候，发一个action
    next({
        ...rest,
        type: REQUEST
    });

    // 定义请求成功时的方法
    const onFulfilled = result =>{
        next({
            ...rest,
            result,
            type: SUCESS
        });
        if(afterSuccess){
            afterSuccess(dispath, getState, result);
        }
    };

    // 定义请求失败的方法
    const onRejected = error =>{
        next({
            ...rest,
            error,
            type: FAILURE
        })
    };

    return promise(axios).then(onFulfilled, onRejected).catch( error =>{
        console.error("MIDDLEWARE ERROR:", error)
        onRejected(error)
    })
}