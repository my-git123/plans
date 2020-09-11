const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlanSchema = new Schema({
    planType: {
        type: String,
        required: true
    },
    cost: {
        type: String
    },
    channel: 
        {
          type: Schema.Types.ObjectId,
          ref : "channel"
            
    }


});

module.exports = Plan = mongoose.model('plan',PlanSchema);