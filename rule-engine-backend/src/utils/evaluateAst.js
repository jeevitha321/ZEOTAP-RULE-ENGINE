function evaluate_rule(ast, data) {
    function evaluate_operand(operand, data) {
        const { leftOperand, operator, rightOperand } = operand.value;
        const leftValue = data[leftOperand];
        const rightValue = parseValue(rightOperand);

        switch (operator) {
            case '>':
                return leftValue > rightValue;
            case '<':
                return leftValue < rightValue;
            case '>=':
                return leftValue >= rightValue;
            case '<=':
                return leftValue <= rightValue;
            case '==':
                return leftValue == rightValue;
            case '===':
                return leftValue === rightValue;
            case '!=':
                return leftValue != rightValue;
            case '!==':
                return leftValue !== rightValue;
            default:
                return false;
        }
    }

    // Helper function to parse right operand values (handle numbers, strings, etc.)
    function parseValue(value) {
        if (!isNaN(value)) {
            return parseFloat(value); // Numeric values
        }
        // Handle strings, e.g., "'Sales'" -> "Sales"
        return value.replace(/^'(.*)'$/, '$1');
    }

    // Recursive function to evaluate the AST
    function evaluate_ast(node, data) {
        if (node.type === 'operand') {
            return evaluate_operand(node, data);
        } else if (node.type === 'operator') {
            const leftEvaluation = evaluate_ast(node.left, data);
            const rightEvaluation = evaluate_ast(node.right, data);
            
            switch (node.value) {
                case 'AND':
                    return leftEvaluation && rightEvaluation;
                case 'OR':
                    return leftEvaluation || rightEvaluation;
                default:
                    return false;
            }
        }
        return false;
    }

    return evaluate_ast(ast, data);
}

module.exports = {evaluate_rule}