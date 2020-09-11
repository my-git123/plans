const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const Plan = require('../../models/Plan');
const Channel = require('../../models/Channel');
// const Profile = require('../../models/Profile');

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
        //const user = await User.findById(req.user.id).select('-password');
        let newPlan = new Plan({ planType, cost });
        //channel = channel.split(",").map(ch => ch.trim());
        const plan = await newPlan.save();
        //console.log(channel);
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

//@route  DELETE api/plans/:plan_id
//@desc   Delete plan in user profile
//@access Private
// router.delete('/:id',auth, async (req,res) => {
//     try {
//         const plan = await Plan.findById(req.params.id);
//         if(!plan) {
//             return res.status(404).json({msg: "Plan not found"});
//         }
//         if(plan.user.toString() !== req.user.id) {
//             return res.status(401).json({msg:'User not authorized'});
//         }
//         await plan.remove();
//         res.json({msg: 'Plan removed'});
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// })
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
    //const newPlan = {planType,cost};
     
    try {
        
         let newChannel = new Channel({channelName,description,price });
         const plan = await Plan.findOneAndUpdate(
             {_id:req.params.planId},
             {$set:{channel:newChannel}},
             {new:true});
        //plan.channel.unshift(newChannel);
       newChannel.save();
        plan.channel = newChannel;
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