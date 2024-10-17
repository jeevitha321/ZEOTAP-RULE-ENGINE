const { parseRuleString } = require('./utils/astParser'); // Adjust the path as necessary
const { combineAST } = require('./utils/combineAST'); // Adjust the path as necessary
const { evaluate_rule } = require('./utils/evaluateAst'); // Adjust the path as necessary

// Sample rule strings
const rule1 = "((age > 30 AND department == 'Sales') OR (age < 25 AND department == 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 = "((age > 30 AND department == 'Marketing')) AND (salary > 20000 OR experience > 5)";

// Parse the rules to create ASTs
const ast1 = parseRuleString(rule1);
const ast2 = parseRuleString(rule2);

// Log the parsed ASTs
console.log("AST for Rule 1:", JSON.stringify(ast1, null, 2));
console.log("AST for Rule 2:", JSON.stringify(ast2, null, 2));

// Combine the two ASTs
const combinedAST = combineAST([ast1, ast2]); // Assuming combineAST accepts an array of ASTs
console.log("Combined AST:", JSON.stringify(combinedAST, null, 2));

// Sample data to evaluate against
const data = {
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 3
};

// Evaluate the combined AST against the data
const evaluationResult = evaluate_rule(combinedAST, data);
console.log("Evaluation Result:", evaluationResult);
