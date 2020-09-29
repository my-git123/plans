import React, {Fragment,useEffect} from 'react';
import DashboardTasks from './DashboardTasks';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getCurrentProfile} from '../../actions/profile';
import MyPlan from './MyPlan';
import Spinner from '../layout/Spinner';
import MyChannels from './MyChannels';

const Dashboard = ({auth:{user},profile:{profile,loading,plan},getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile();
    },[getCurrentProfile]);
       
    
    return loading && profile === null? <Spinner /> : <Fragment>
        <h1 className = 'large text-primary text-center'>My Dashboard</h1>
        <p className = "lead">
          <i className = "fas fa-user"></i>Welcome { user && user.name}</p>

    {profile !== null ? <Fragment>
        <DashboardTasks /> 
        
               
        <MyPlan plan = {plan} 
                profile = {profile}/>
        <MyChannels profile = {profile} />
        
        </Fragment> : <p>You have not yet setup a profile,please add some info</p>}
        
    </Fragment>

    
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    };

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
