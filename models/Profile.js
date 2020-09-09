const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan"
        },
    myChannels:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"channel"
        }
    ],
    location: {
        type: String
    },
    phone:{
        type:String
    }
    
});
module.exports = Profile = mongoose.model('profile',ProfileSchema);