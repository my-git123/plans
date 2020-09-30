import {GET_CHANNELS,CHANNELS_ERROR} from '../actions/types';

const initialState = {
    channels:[],
    error:{}
}

export default function(state = initialState,action) {
const {type,payload} = action;
switch(type) {
    case GET_CHANNELS:
        return {
            ...state,
            channels:payload,
            // channels:payload.reduce((result, elem) => {
            //     if (!result.some((e) => e.channelName === elem.channelName)) {
            //         result.push(elem);
            //     }},[])
            
            }                
               
    case CHANNELS_ERROR:
        return {
            ...state,
            error: payload
        }
    default:
        return state;
}
}