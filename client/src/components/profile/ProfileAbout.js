import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({profile:{
    location, 
    phone,
    user:{name}
 }
}) => {
    return (
        <div className = "profile-about bg-light p-2">
        {location && (<Fragment>
            <h2 className = "text-primary">{name}'s location</h2>
            <p>
              {location}
            </p>
            <div className = "line"></div>
            </Fragment>
        )}
          
          <h2 className = "text-primary">phone</h2>
          
          {phone}
            
        </div>
       
    );
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;
