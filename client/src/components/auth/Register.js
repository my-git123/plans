import React, {Fragment,useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/auth';

const Register = ({isAuthenticated,registerUser}) => {
const [formData,setFormData] = useState({
    name: '',
    email:'',
    password:'',
    confirmPwd:''
});
const {name,email,password,confirmPwd} = formData;

const onChange = (event) => {
    setFormData({...formData, [event.target.name]:event.target.value});
}

const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPwd) {
        console.log('Password do not match');
    } else {
        registerUser({name,email,password});
        console.log('Register User');
    }
}

if (isAuthenticated) {
    return <Redirect to = '/dashboard' />
}
    return (
        <Fragment>
        <h1 className = 'large text-primary'>Sign Up</h1>
        <p className = 'lead'>Create Your Account</p>
        <form className = 'form' onSubmit = {onSubmit}>
        <div className = 'form-group'>
        <input type = 'text' 
               name = 'name' 
               placeholder = 'Name'
               onChange = {onChange}
               value = {name}/>
        </div>
        <div className = 'form-group'>
        <input type = 'email' 
               name = 'email' 
               placeholder = 'Email'
               onChange = {onChange}
               value = {email}/>
        </div>
        <div className = 'form-group'>
        <input type = 'text' 
               name = 'password' 
               placeholder = 'Password'
               onChange = {onChange}
               value = {password}/>
        </div>
        <div className = 'form-group'>
        <input type = 'text' 
               name = 'confirmPwd' 
               placeholder = 'Confirm Password'
               onChange = {onChange}
               value = {confirmPwd}/>
        </div>
        <input type = 'submit'
               className = 'btn btn-primary'
               value = 'Register' />
        </form>
        </Fragment>
    )
}

Register.propTypes = {
isAuthenticated:PropTypes.bool,
registerUser:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{registerUser})(Register);
