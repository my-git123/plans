import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {getProfileById} from '../../actions/profile';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';


const Profile = ({profile:{profile,loading},getProfileById,match}) => {
    useEffect(() => {
        getProfileById(match.params.userId);
    },[getProfileById,match.params.userId]);
    
    

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :(
                <Fragment>
                <h1 className ="large">{profile.user.name}</h1>
                <p className ="lead">{profile.phone}  </p>
                <p>{profile.location}</p>
                </Fragment>)}
        </Fragment>
    )
}

Profile.propTypes = {
profile:PropTypes.object.isRequired,
//auth:PropTypes.object.isRequired,
getProfileById:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile:state.profile,
    //auth:state.auth
});

export default connect(mapStateToProps,{getProfileById})(Profile);
