const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
// const auth = require('../../middleware/auth');
const Channel = require('../../models/Channel');
// const User = require('../../models/User');

//@route  GET api/channels
//@desc   Get Channels
//@access Public
router.get('/', async (req,res) => {
    try {
        const channel = await Channel.find();
        res.json(channel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//@route  POST api/channels
//@desc   Add/Create new Channel
//@access Private
router.post('/',[
    body('channelName','Channel Name is required').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    try {
        const {channelName, description,price} = req.body;
        //const user = await User.findById(req.user.id).select('-password');
        //const profile = await Profile.findOne({user:req.user.id});
        const newChannel = new Channel({channelName,description,price});
        const channel =  await newChannel.save();
        res.json(channel);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
//@route  api/channels/user/:user_id
//@desc   GET channels by userId
//@access Public
// router.get('/user/:user_id', async (req,res) => {
//     try {
//     const channel = await Channel.findOne({user:req.params.user_id}).populate('user',['name']);
//     if (!channel) {
//         return res.status(400).json({msg:'No channels to show'});
//     }
//     res.json({channel});
// } catch (err) { 
//     console.error(err.message);
//     if(err.kind === 'ObjectId') {
//         return res.status(400).json({msg:'No channels to show'});
//     }
// res.status(500).send('Server Error');
// }
// });
module.exports = router;