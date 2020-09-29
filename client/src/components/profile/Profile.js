import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getProfileById} from '../../actions/profile';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileAbout from './ProfileAbout';


const Profile = ({profile:{profile,loading},getProfileById,auth,match}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);
    
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :(
                <Fragment>
                {auth.isAuthenticated && 
                    loading === false &&
                     auth.user._id === profile.user._id &&
                    (<Link to = "/edit-profile" className = "btn btn-dark">
                    Edit Profile
                    </Link>
                    )
                }
                <div className="profile-grid my-1">
                <h1 className ="large">{profile.user.name}</h1>
               <ProfileAbout profile = {profile} />
                </div>
                
                </Fragment>)}
        </Fragment>
    )
}

Profile.propTypes = {
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
getProfileById:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile:state.profile,
    auth:state.auth
});

export default connect(mapStateToProps,{getProfileById})(Profile);
