import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to = '/dashboard' />
  }
    return (
        <section className = "landing">
        <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Choose Your Favorite Plans!! </h1>
          <p className="lead">
            Choose from a vast list of cable TV plans that suits your taste and need. Get quotes to customize your plans as per your requirements and budget.
          </p>
          <div className="buttons">
            <Link to = "/register" className="btn btn-primary">Sign Up</Link>
            <Link to = "/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
        </section>
    )
}

Landing.propTypes = {
isAuthenticated:PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
