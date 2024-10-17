const Node = require('../models/Node');

function combineAST(asts, combineOperator = 'OR') {
    if (!asts || asts.length === 0) return null;
    if (asts.length === 1) return asts[0]; // If there's only one AST, return it as is.

    let combinedAST = new Node('operator', asts[0], asts[1], combineOperator);

    for (let i = 2; i < asts.length; i++) {
        combinedAST = new Node('operator', combinedAST, asts[i], combineOperator);
    }

    return combinedAST;
}

module.exports = {combineAST};