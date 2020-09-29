import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlanItem from './PlanItem';
import {getPlans} from '../../actions/plans';

const ViewPlan = ({getPlans,plan:{plans}}) => {
    useEffect(() => {
        getPlans();
    },[getPlans]);

    return (
        <div>
        {plans.length>0 ? (
            plans.map(plan => (
               <PlanItem key = {plan._id}
                         plan = {plan} />
               ))) : (<h4>No Plans found</h4>)
            }
        </div>
    )
}

ViewPlan.propTypes = {
getPlans:PropTypes.func.isRequired,
plan:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    plan:state.plan
});

export default connect(mapStateToProps,{getPlans})(ViewPlan);
