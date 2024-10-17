function evaluate_rule(ast, data) {
    // Helper function to evaluate a single operand
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

// Example usage:
const combinedAST = {
  "type": "operator",
  "left": {
    "type": "operator",
    "left": {
      "type": "operator",
      "left": {
        "type": "operand",
        "left": null,
        "right": null,
        "value": {
          "leftOperand": "age",
          "operator": ">",
          "rightOperand": "30"
        }
      },
      "right": {
        "type": "operand",
        "left": null,
        "right": null,
        "value": {
          "leftOperand": "department",
          "operator": "==",
          "rightOperand": "'Sales'"
        }
      },
      "value": "AND"
    },
    "right": {
      "type": "operator",
      "left": {
        "type": "operand",
        "left": null,
        "right": null,
        "value": {
          "leftOperand": "age",
          "operator": "<",
          "rightOperand": "25"
        }
      },
      "right": {
        "type": "operand",
        "left": null,
        "right": null,
        "value": {
          "leftOperand": "department",
          "operator": "==",
          "rightOperand": "'Marketing'"
        }
      },
      "value": "AND"
    },
    "value": "OR"
  },
  "right": {
    "type": "operator",
    "left": {
      "type": "operand",
      "left": null,
      "right": null,
      "value": {
        "leftOperand": "salary",
        "operator": ">",
        "rightOperand": "50000"
      }
    },
    "right": {
      "type": "operand",
      "left": null,
      "right": null,
      "value": {
        "leftOperand": "experience",
        "operator": ">",
        "rightOperand": "5"
      }
    },
    "value": "OR"
  },
  "value": "OR"
};

const data = {
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 3
};

// Test the evaluation
console.log(evaluate_rule(combinedAST, data)); // Expected output: true

const data2 = {
    age: 24,
    department: 'IT',
    salary: 45000,
    experience: 2
};

const data3 = {
    age: 32,
    department: 'Sales',
    salary: 60000,
    experience: 4
};

// Test the evaluation with the new data
console.log(evaluate_rule(combinedAST, data3)); // Expected output: true


// Test the evaluation with the new data
console.log(evaluate_rule(combinedAST, data2)); // Expected output: false
