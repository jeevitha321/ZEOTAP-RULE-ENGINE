const Node = require('../models/Node')

const OPERATORS = ['AND', 'OR'];
const COMPARISON_OPERATORS = ['>', '<', '>=', '<=', '==', '!='];

function parseRuleString(ruleString) {
    let tokens = tokenize(ruleString);
    console.log(tokens);
    let index = { value: 0 };
    return buildAST(tokens, index);
}

function tokenize(ruleString) {
    return ruleString
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .split(' ')
        .filter(token => token.trim().length > 0);
}

function buildAST(tokens, index) {
    let nodeStack = [];
    let operatorStack = [];

    while (index.value < tokens.length) {
        let token = tokens[index.value];

        if (token === '(') {
            index.value++;
            let node = buildAST(tokens, index);
            nodeStack.push(node);
        } else if (token === ')') {
            break;
        } else if (OPERATORS.includes(token)) {
            while (
                operatorStack.length > 0 &&
                precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
            ) {
                let operator = operatorStack.pop();
                let rightNode = nodeStack.pop();
                let leftNode = nodeStack.pop();
                nodeStack.push(new Node('operator', leftNode, rightNode, operator));
            }
            operatorStack.push(token);
        } else {
            let conditionTokens = [];
            while (
                index.value < tokens.length &&
                !OPERATORS.includes(tokens[index.value]) &&
                tokens[index.value] !== '(' &&
                tokens[index.value] !== ')'
            ) {
                conditionTokens.push(tokens[index.value]);
                index.value++;
            }
            index.value--; 

            let conditionNode = parseCondition(conditionTokens);
            nodeStack.push(conditionNode);
        }
        index.value++;
    }

    while (operatorStack.length > 0) {
        let operator = operatorStack.pop();
        let rightNode = nodeStack.pop();
        let leftNode = nodeStack.pop();
        nodeStack.push(new Node('operator', leftNode, rightNode, operator));
    }

    return nodeStack[0];
}

function precedence(operator) {
    return operator === 'AND' ? 2 : 1;
}

function parseCondition(conditionTokens) {
    let leftOperand = conditionTokens[0];
    let operator = conditionTokens[1];
    let rightOperand = conditionTokens.slice(2).join(' ');

    if (!COMPARISON_OPERATORS.includes(operator)) {
        throw new Error(`Invalid comparison operator: ${operator}`);
    }

    return new Node('operand', null, null, { leftOperand, operator, rightOperand });
}

module.exports = { parseRuleString };
