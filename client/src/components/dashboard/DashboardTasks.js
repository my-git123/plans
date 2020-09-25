import React from 'react';
import {Link} from 'react-router-dom';

const DashboardTasks = () => {
    return (
        <div className = 'dash-buttons'>
        <Link to = 'my-profile' className = 'btn btn-primary'>My Profile</Link>
        <Link to = 'view-plans' className = 'btn btn-primary'>View Plans</Link>
        <Link to = 'browse-channels' className = 'btn btn-primary'>Browse Channels</Link>
            
        </div>
    )
}

export default DashboardTasks;
