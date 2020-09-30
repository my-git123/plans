import axios from 'axios';
import {GET_CHANNELS,CHANNELS_ERROR} from './types';

//Get all channels
export const getChannels = () => async dispatch => {
    try {
        const res = await axios.get('/api/channels');
        dispatch({
            type:GET_CHANNELS,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:CHANNELS_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}