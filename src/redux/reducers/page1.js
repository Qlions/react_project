import {TAG} from "../actions/page1"

const initState = {
    num : 3
}
export default function reducer (state = initState, action){
    switch(action.type){
        case TAG:
            return {
                ...state,
                num: state.num+1
            }
        default: return state
    }
}