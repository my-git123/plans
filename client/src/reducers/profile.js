import {GET_PROFILE,PROFILE_ERROR,GET_PROFILES, PROFILE_PLANS, PLAN_ERROR} from '../actions/types';

const initialState = {
    profile:null,
    profiles:[],
    loading:true,
    plan:null,
    error:{}
}
export default function(state = initialState,action) {
    const {payload,type} = action;
    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false,
                plan:payload.plan
            }
        case PLAN_ERROR:
        case PROFILE_ERROR:
            return {
                ...state,
                error:payload,
                loading:false,
                profile:null
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
        case PROFILE_PLANS:
            return {
                ...state,
                plan:payload

            }
        default:
            return state;
    }
}