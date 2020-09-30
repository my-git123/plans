import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {getChannels} from '../../actions/channels';
import PropTypes from 'prop-types';

const ViewChannels = ({getChannels,channels}) => {
    useEffect(() => {
        getChannels();
    },[]);

       
const channelList =  (channels.map(channel => channel.channelName + "  ")).reduce((unique,item) => {
        return unique.includes(item) ? unique : [...unique,item]
    },[]);

    

    console.log(channelList);

     
    return (
        <div className = 'bg-light'>
            {channels.length > 0 ? channelList  : <h4>No Channels</h4>}
            
        </div>
    )
}

ViewChannels.propTypes = {
channels:PropTypes.array.isRequired,
getChannels:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    channels:state.channel.channels
});
export default connect(mapStateToProps,{getChannels})(ViewChannels);
