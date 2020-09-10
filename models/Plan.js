const mongoose = require('mongoose');
const PlanSchema = new mongoose.Schema({
    planType: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        },
    channel: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "channel"
    }
});

module.exports = Plan = mongoose.model('plan',PlanSchema);