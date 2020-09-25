import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import {showPlan} from '../../actions/profile';

const MyPlan = ({plan,profile}) => {


const thePlan = (
    <tr key = {plan.id}> 
    <td>{plan.planType}</td>
    <td className = "hide-sm">{plan.cost}</td>
    <td>{profile.channels.map(channel => channel.channelName)}</td>
    </tr>
);
//console.log(thePlan);

    return (
        <Fragment>
            <h2 className = "my-2"> My Plan </h2>
            <table className = "table">
             <thead>
                <tr>
                   <th>PlanType</th>
                   <th className = "hide-sm">cost</th>
                   <th className = "hide-sm">channels</th>
                   
                </tr>
             </thead>
             <tbody>{thePlan}</tbody>
            </table>
        </Fragment>
    )
}

MyPlan.propTypes = {
plan:PropTypes.object,
profile:PropTypes.object
}


export default connect(null)(MyPlan);

