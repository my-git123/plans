import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR,PROFILE_PLANS,PLAN_ERROR} from './types';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        
    } catch (err) {
        console.error(err);
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        });
    }
}
//Get Profile by userId
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
            });
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

}
//show plan for user profile api/profile/:profileId/plan
export const showPlan = (profileId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${profileId}/plan`);
        dispatch({
            type:PROFILE_PLANS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: PLAN_ERROR,
            payload: ({msg: err.response.statusText, status: err.response.status})
        });
    }
}