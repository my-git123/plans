import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import { Provider } from "react-redux";
import store from "./store";
import {loadUser} from './actions/auth';
import setAuthToken from "./utils/setAuthToken";
import MyPlan from './components/dashboard/MyPlan';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    }, []);
  return (
    <Provider store = {store}>
    <Router>
     <Fragment>
     <Navbar />
     <Route exact path = '/' component = {Landing} />
     <section className = 'container'>
        <Switch>
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/dashboard' component = {Dashboard} />
        <Route exact path = '/my-plan' component = {MyPlan} />
        <Route exact path = '/profile/userId' component = {Profile} />

       </Switch>   
     </section>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
