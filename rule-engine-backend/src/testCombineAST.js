const { combine_rules } = require('./utils/combineRules');

const rules = [
    "age > 30 AND department == 'Sales'",
    "age < 25 AND department == 'Marketing' AND salary < 10000",
    "salary > 50000 OR experience > 5"
];

const combinedAST = combine_rules(rules);
console.log("Combined AST:", JSON.stringify(combinedAST, null, 2));
