const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const Plan = require('../../models/Plan');
const Channel = require('../../models/Channel');

//@route  POST api/plans
//@desc   Add new plan 
//@access Public
router.post('/',[
    body('planType','Specify a plan type').not().isEmpty(),
    ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    let {planType,cost} = req.body;
    
    try {
         let newPlan = new Plan({ planType, cost });
         const plan = await newPlan.save();
         res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Erorr');
        
    }
});
//@route  GET api/plans
//@desc   Get all plans 
//@access Public
router.get('/', async(req,res) => {
try {
    const plans = await Plan.find();
    res.json(plans);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

//@route  POST api/plans/:plan_id
//@desc   Create new Channel and update channel field in plan 
//@access Public
router.post('/:planId',[
    body('channelName','Please specify a channel name').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {channelName,description,price} = req.body;
        
    try {
        
         let newChannel = new Channel({channelName,description,price });
         const plan = await Plan.findOneAndUpdate(
             {_id:req.params.planId},
             {new:true});
         plan.channel.unshift(newChannel);
          newChannel.save();
          await plan.save();
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route  GET api/plans/:planId
//@desc   Get a plan by id and populating its channel 
//@access Private
router.get('/:planId', auth, async(req,res) => {
    try {
        const plan = await Plan.findOne({_id:req.params.planId}).populate('channel',['channelName','description','price']);
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    });

module.exports = router;