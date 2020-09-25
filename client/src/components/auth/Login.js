import React,{Fragment,useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({isAuthenticated,loginUser}) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });
    const {email,password} = formData;

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]:event.target.value});
    }
    const onSubmit = (event) => {
        event.preventDefault();
        loginUser(email,password);
        console.log('Login User');
    }
    if (isAuthenticated) {
        return (<Redirect to = '/dashboard' />)
    }


    return (
        <Fragment>
            <h1 className = 'large text-primary'>Sign In</h1>
            <p className = 'lead'>Enter Your Login Credentials</p>
            <form className = 'form' onSubmit = {onSubmit}>
            <div className = 'form-group'>
            <input type = 'email'
                   name = 'email'
                   placeholder = 'Email'
                   onChange = {onChange}
                   value = {email} />
            </div>
            <div className = 'form-group'>
            <input type = 'password'
                   name = 'password'
                   placeholder = 'Password'
                   onChange = {onChange}
                   value = {password} />
            </div>
            <input type = 'submit'
                   className = 'btn btn-primary'
                   value = 'Login'/>
            </form>
        </Fragment>
    )
}

Login.propTypes = {
isAuthenticated:PropTypes.bool,
loginUser:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loginUser})(Login);
