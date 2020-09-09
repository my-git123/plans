const mongoose = require('mongoose');
const PlanSchema = new mongoose.Schema({
    planType: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        }
});

module.exports = Plan = mongoose.model('plan',PlanSchema);