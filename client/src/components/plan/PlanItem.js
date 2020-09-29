import React from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";


// <Link to ={`/profile/${_id}`} className = "btn btn-primary">View profile
//         </Link>

const PlanItem = ({
    plan:{
        channel,
        planType,
        cost}
    }) => {
    //console.log(planType);
    return (
        
        <div className = 'bg-light'>
        <div>
        <p className = 'lead'><span>PlanName: {''}</span>{planType} </p>
        <p className = 'lead'><span>Cost:{''}</span>{cost}</p>
        {/*<p>{channel}</p>*/}
        </div>
        <h2>Channels in this Plan: {''}
        <ul>
            {channel.map(ch => (
                <li key = {ch._id} className = "text-primary">
                  {ch.channelName}
                </li>
            ))}
            </ul>
            </h2>
            </div>
    )
};

PlanItem.propTypes = {
    plan: PropTypes.object.isRequired

}

export default PlanItem;
