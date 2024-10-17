const { parseRuleString } = require('./astParser');
const Node = require('../models/Node'); // Ensure you have the correct path



function combine_rules(rules) {
    const asts = rules.map(rule => parseRuleString(rule));
    
    // Combine all ASTs
    const combinedAST = asts.reduce((acc, current) => {
        if (!acc) return current; // If acc is null, return the current AST
        return combineASTs(acc, current);
    }, null);

    return combinedAST;
}

function combineASTs(ast1, ast2) {
    if (!ast1) return ast2; // If the first AST is null, return the second
    if (!ast2) return ast1; // If the second AST is null, return the first

    // Check the type of operators to decide how to combine
    // You can implement a heuristic here if needed
    const combinedNode = new Node('operator', ast1, ast2, 'OR'); // Combine with OR for demonstration
    return combinedNode;
}

module.exports = { combine_rules };
