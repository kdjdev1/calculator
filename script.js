document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let currentOperation = null;
    let previousInput = '';
    
    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            // Number buttons
            if (button.classList.contains('number')) {
                // Prevent leading zeros
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                updateDisplay();
            }
            
            // Decimal button
            else if (button.classList.contains('decimal')) {
                // Only add decimal if there isn't one already
                if (!currentInput.includes('.')) {
                    currentInput = currentInput === '' ? '0.' : currentInput + '.';
                    updateDisplay();
                }
            }
            
            // Clear button
            else if (button.classList.contains('clear')) {
                clear();
            }
            
            // Backspace button
            else if (button.classList.contains('backspace')) {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    updateDisplay();
                }
            }
            
            // Operation buttons
            else if (button.classList.contains('operator')) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        calculate();
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    
                    // Set the current operation
                    switch (value) {
                        case '+':
                            currentOperation = 'add';
                            break;
                        case '-':
                            currentOperation = 'subtract';
                            break;
                        case '×':
                            currentOperation = 'multiply';
                            break;
                        case '÷':
                            currentOperation = 'divide';
                            break;
                    }
                }
            }
            
            // Equals button
            else if (button.classList.contains('equals')) {
                if (currentInput !== '' && previousInput !== '') {
                    calculate();
                    currentOperation = null;
                    previousInput = '';
                }
            }
        });
    });
    
    // Function to update display
    function updateDisplay() {
        result.value = currentInput;
    }
    
    // Function to clear all values
    function clear() {
        currentInput = '';
        previousInput = '';
        currentOperation = null;
        updateDisplay();
    }
    
    // Function to perform calculations
    function calculate() {
        let calculationResult;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (currentOperation) {
            case 'add':
                calculationResult = prev + current;
                break;
            case 'subtract':
                calculationResult = prev - current;
                break;
            case 'multiply':
                calculationResult = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    calculationResult = 'Error';
                } else {
                    calculationResult = prev / current;
                }
                break;
            default:
                return;
        }
        
        // Handle long decimal results
        if (typeof calculationResult === 'number') {
            // Limit to 10 digits to avoid overflow
            calculationResult = Math.round(calculationResult * 1000000000) / 1000000000;
            currentInput = calculationResult.toString();
        } else {
            currentInput = calculationResult;
        }
        
        updateDisplay();
    }
    
    // Initialize display
    updateDisplay();
});