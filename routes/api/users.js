const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//@route  POST api/users
//@desc   Register new user
//@access Public
router.post('/',[
    [
        body('name','Name is required').not().isEmpty(),
        body('email','Please enter a valid email').isEmail(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 })
      ]
],async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
const {name,email,password} = req.body;
try {
    //Check if user already exists
    let user = await User.findOne({email});
    if (user) {
        //return res.status(400).json({errors: [{msg: 'User already exists'}]})
        return res.status(400).json({msg: 'User already exists'});
    }
    user = new User({name,email,password});//create new user instance
    //encrypt the password before saving in db
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password,salt);
await user.save();
//create payload and jwt sign for authentication
const payload = {
    user: {
        id:user.id
    }
}
jwt.sign(payload,config.get('jwtSecret'),{
    expiresIn:3600000
},(err,token) => {
if(err) throw err;
res.json({token});
});

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Eror');
}

});

module.exports = router;