import axios from 'axios';
import {GET_PLANS,PLANS_ERROR} from './types';

//Get plans
export const getPlans = () => async dispatch => {
    try {
    const res = await axios.get('/api/plans');
    dispatch({
        type:GET_PLANS,
        payload:res.data
       });
       console.log(res.data);
    } catch (err) {
        dispatch({
            type:PLANS_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}