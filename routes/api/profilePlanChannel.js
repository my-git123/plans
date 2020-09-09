const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {body,validationResult} = require('express-validator');
const Plan = require('../../models/Plan');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route  api/profile/plan/channels
//@desc   GET channels user profile
//@access Private
router.get('/plan/channels', async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.user.id});
        if (profile) {
            
        }
    } catch (err) {
        console.error(err.mesage);
        res.status(500).send('Server Error');
    }
})