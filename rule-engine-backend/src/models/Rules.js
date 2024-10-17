
const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    ruleName: { type: String, required: true, unique: true },
    ruleString: { type: String, required: true },
    astRepresentation: { type: Object },

})

const Rule = mongoose.model('Rule', RuleSchema);

module.exports = Rule;