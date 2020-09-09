const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
// const User = require('../../models/User');
const Plan = require('../../models/Plan');

//@route  api/profile/me
//@desc   GET current user profile
//@access Private
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user','name');
        if (!profile) {
            return res.status(400).json({msg:'Profile does not exist'});
        }
      res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST api/profile/
//@desc   create user profile
//@access Private

router.post('/', auth,async (req,res) => {
    const {location,phone} = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
   
    if (location) profileFields.location = location;
    if (phone) profileFields.phone = phone;
    
    try {
        //update profile if already exisiting
let profile = await Profile.findOne({user:req.user.id});
if(profile) {
    profile = await Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set:profileFields},
        {new:true});
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
//@route  api/profile/user/:user_id
//@desc   GET profile by userId
//@access Public
router.get('/user/:user_id',async (req,res) => {
    try {
    const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name']).populate('plan',['planType']);
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
})
//@route  PUT api/profile/plan
//@desc   Update user's plan
//@access Private
router.put('/plan',[auth,[
    body('planType','Please select a plan Type').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {planType,cost} = req.body;
    //const newPlan = {planType,cost};
        
    try {
        const profile = await Profile.findOne({user:req.user.id});
        let newPlan = new Plan({
            planType,cost,user:req.user.id
        });
       //newPlan.save();
        profile.plan = newPlan;
         await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route  GET api/profile/myChannels
//@desc   GET  user's channels
//@access Private
// router.get('/myChannels',auth,async (req,res) => {
// try {
//     const profile = await Profile.findOne({user:req.user.id});
//     res.json(profile.myChannels);
// } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
// }
// })



module.exports = router;