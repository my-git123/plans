import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyChannels = ({profile}) => {
    const theChannels = profile.channels.map(channel => (
        <tr key = {channel._id}> 
            <td>{channel.channelName}</td>
            <td>{channel.description}</td>
            <td>{channel.price}</td>
        </tr>
    ));
    
    return (
        <Fragment>
            <h1 className = 'my-2'>Current Channels</h1>
            <table className = 'table'>
            <thead>
             <tr>
                <th>Channel Name</th>
                <th className = "hide-sm">Description</th>
                <th className = "hide-sm">Price</th>
                  
             </tr>
            </thead>
            <tbody>{theChannels}</tbody>
            </table>
        </Fragment>
    )
}

MyChannels.propTypes = {
 profile:PropTypes.object
}

export default connect(null)(MyChannels);
