const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route  GET api/auth
//@desc   Auth route
//@access Public
router.get('/',auth, async (req,res) => {
try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    // res.send('This is auth route')
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
    
});
//@route   POST api/auth
//@desc    Authenticate user and get token
//@access  Public
router.post('/',[
    body('email','Please enter a valid email').isEmail(),
    body('password','Password is required').exists()
],async (req,res) => {
const {email,password} = req.body;
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
}
try {
    let user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({msg:'Invalid credentials'});
    } 
    //bcrypt.match
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({msg:'Invalid credentials'});
        }

    const payload = {
        user: {
            id:user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:3600000},(err,token) => {
            if(err) throw err;
            res.json({token});

        })

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
})

module.exports = router;