const mongoose = require('mongoose');
const ChannelSchema = new mongoose.Schema({
    channelName: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    price: {
        type: String
    }
    
    
});

module.exports = Channel =  mongoose.model('channel',ChannelSchema);