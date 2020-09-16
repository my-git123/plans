const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const Plan = require('../../models/Plan');

//@route  api/profile/me
//@desc   GET current user profile
//@access Private
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user','name').populate('channels').populate('plan');
        if (!profile) {
            return res.status(400).json({msg:'Profile does not exist'});
        }
      res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//************************************************************************************
//@route  POST api/profile/
//@desc   create user profile
//@access Private
router.post('/', auth,async (req,res) => {
    const {location,phone,planType} = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (phone) profileFields.phone = phone;
    if (planType) profileFields.planType = planType;
        try {
        //update profile if already exisiting
let profile = await Profile.findOne({user:req.user.id});
if(profile) {
    profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set:profileFields},
        {new:true}).populate('user',['name']);
        return res.json(profile);
}
//create profile
profile = new Profile(profileFields);
await profile.save();
return res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
   }
});
// **********************************************************************************
//@route  api/profile/user/:user_id
//@desc   GET profile by userId
//@access Public
router.get('/user/:user_id',async (req,res) => {
    try {
    const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name']).populate('plan',['planType']).populate('channels');
    if (!profile) {
        return res.status(400).json({msg:'Profile not found'});
    }
    res.json(profile);
} catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
        return res.status(400).json({msg:'Profile not found'});
    }
res.status(500).send('Server Error');
}
});
//********************************************************************************* */
//@route  DELETE api/profile/
//@desc   DELETE  user profile
//@access Private
router.delete('/',auth, async (req,res) => {
try {
    await Profile.findOneAndRemove(req.user.id);
    res.json({msg: 'Profile deleted successfully'});
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});
//**************************************************************************** */
//@route  POST api/profile/:profileId
//@desc   Add plan in user profile
//@access Private
// router.post('/:profileId',[auth,[
//     body('planType','Please specify a plan name').not().isEmpty()
// ]], async (req,res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({errors:errors.array()});
//     }
//     try {
//         const profile = await Profile.findOneAndUpdate({_id:req.params.profileId},
//             {plan: Plan._id}, {new:true});
//         let newPlan = new Plan(req.body.planType );
//          newPlan.save();
//         profile.plan = newPlan;
//          await profile.save();
//         return res.json(profile);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });
//**************************************************************************** */
//@route  GET api/profile/:profileId/plan
//@desc   populate profile with plan
//@access Private
router.get('/:profileId/plan', auth, async (req,res) => {
    try {
        let profile = await Profile.findById(req.params.profileId);
        if (profile) {
            const plan = await Plan.findOne({planType:profile.planType}).populate('channel',['channelName','description','price']);
            if (plan) {
                profile = await Profile.findOneAndUpdate({_id:req.params.profileId},
                   {plan:plan}).populate('plan');
                return res.json(profile);
            }
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//******************************************************************************* */
//@route  GET api/profile/:profileId/channels
//@desc   populate profile with channels
//@access Private
router.get('/:profileId/channels', auth, async (req,res) => {
    try {
        let profile = await Profile.findById(req.params.profileId);
        if (profile) {
            const plan = await Plan.findOne({planType:profile.planType}).populate('channel',['channelName']);
            //console.log(plan);
            if (plan) {
                profile = await Profile.findOneAndUpdate({_id:req.params.profileId},
                   {channels:plan.channel}).populate('channels',['channelName']);
                return res.json(profile);
            }
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;