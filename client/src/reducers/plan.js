import {PLANS_ERROR,GET_PLANS} from '../actions/types';

const initialState = {
    plans :[],
    error: {}
}

export default function(state = initialState,action) {
    const{type,payload} = action;
    switch(type) {
        case GET_PLANS:
            return {
                ...state,
                plans:payload

            }
        case PLANS_ERROR:
            return {
                ...state,
                error:payload
            }
        default:
            return state;
    }
}