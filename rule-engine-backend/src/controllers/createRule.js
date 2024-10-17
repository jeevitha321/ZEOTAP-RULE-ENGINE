const Rule = require('../models/Rule');
const { parseRuleString } = require('../utils/astUtils');
const{combine_rules} = require('../utils/combineRules');
const {evaluate_rule} = require('../utils/evaluateAst')

exports.createRule = async (req, res) => {
    try {
        const { ruleString, ruleName } = req.body;

       
        if (!ruleString || !ruleName) {
            return res.status(400).json({ error: "Both ruleString and ruleName are required." });
        }

 
        const existingRule = await Rule.findOne({ ruleName });
        if (existingRule) {
            return res.status(400).json({ error: "Rule name already exists. Please choose a different name." });
        }
        
        const ast = parseRuleString(ruleString);

        
        const rule = new Rule({
            ruleName,
            ruleString,
            astRepresentation: ast
        });
        await rule.save();

        res.status(201).json({ message: "Rule created successfully", ruleId: rule._id, rule });
    } catch (error) {
        res.status(500).json({ error: "Failed to create rule", details: error.message });
    }
};


exports.combineRules = async(req, res)=>{

    try{
        const {ruleStrings, ruleName} = req.body;

        if (!ruleStrings.length || !ruleName) {
            return res.status(400).json({ error: "Both ruleString and ruleName are required." });
        }
    
        const existingRule = await Rule.findOne({ ruleName });
        if (existingRule) {
            return res.status(400).json({ error: "Rule name already exists. Please choose a different name." });
        }

        const combinedAST = combine_rules(ruleStrings);

       const combinedRule = new Rule({
            ruleName,
            ruleString: ruleStrings.join(' OR '),
            astRepresentation: combinedAST
        })
        await combinedRule.save();
        res.status(201).json({ message: "Combined Rule created successfully", ruleId: combinedRule._id, combinedRule });

    }
    catch (error) {
        res.status(500).json({ error: "Failed to create combined rule", details: error.message });
    }

}

exports.evaluateData = async(req,res)=>{

    try{
        const{data,ast} = req.body;
        if(!ast || !data){
            return res.status(400).json({error:"Both AST and data are required"});
        }

        const isSatifiesCondition = evaluate_rule(ast,data);
        if(isSatifiesCondition){
         return res.status(201).json({message:"The data satifies the rule", ruleEvaluation:isSatifiesCondition});  
        }
        else{
            return res.status(201).json({message:"The data does not satifies the rule", ruleEvaluation:isSatifiesCondition})
        }
    }
    catch(err){
        res.status(500).json({ error: "Failed to evaluate rule", details: err.message });
    }
}