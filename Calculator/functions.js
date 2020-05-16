displayValue = '0';

//Unit Testing Versions

var solve = function (operator, firstOperand, secondOperand) {
	var solveAddition = function () {
		displayValue = firstOperand + secondOperand;
	}
	var solveSubraction = function () {
		displayValue = firstOperand - secondOperand;
	}
	var solveMultiplication = function () {
		displayValue = firstOperand * secondOperand;
	}
	var solveDivision = function () {
		displayValue = firstOperand / secondOperand * 1.0;
	}

	switch (operator) {
		case '+':
			solveAddition();
			break;
		case '-':
			solveSubraction();
			break;
		case '*':
			solveMultiplication();
			break;
		case '/':
			solveDivision();
			break;
	}

	return displayValue;
}

var handleNumericalInput = function (value) {
	// displayValue = displayValue.toString();
	// value = value.toString();

	if (waitingForSecondOperand) {
		displayValue = value;
		waitingForSecondOperand = false;
	}
	//just like a regular calculator, if there are already too many digits, 
	//ignore any more pressed.
	else {  //first value
		if (displayValue.length >= 13)   //13 ok. 14+ bad
		{
			return;
		}
		else {
			displayValue = displayValue === '0' ? value : displayValue + value;
		}
	}
	return displayValue;
}

var handleOperatorInput = function (value) {
	if (firstOperand === null) {
		firstOperand = Number(displayValue);
		waitingForSecondOperand = true;
		operator = value;
	}
	else if (waitingForSecondOperand) {
		operator = value;
	}
	else {
		secondOperand = Number(displayValue);
		functions.solve(operator, firstOperand, secondOperand);
		operator = value;
		firstOperand = Number(displayValue);
		waitingForSecondOperand = true;
	}
	secondOperand = null;

	return operator;
}

var handleDecimalInput = function () {
	// displayValue = displayValue.toString();
	// value = value.toString();	//not as clean this way, just make test inputs strings

	if (waitingForSecondOperand) {
		displayValue = "0.";
		waitingForSecondOperand = false;
	}
	else if (!displayValue.includes('.')) {
		if (displayValue.length >= 13)   //13 ok. 14+ bad
		{
			return;
		}
		displayValue += '.';
	}

	return displayValue;
}

var handleEqualsInput = function (firstValue, secondValue) {
	if (operator) {
		if (firstOperand === null) {
			firstOperand = Number(firstValue);
		}
		if (secondOperand === null) {
			secondOperand = Number(secondValue);
		}

		functions.solve(operator, firstOperand, secondOperand);
		firstOperand = null;
		waitingForSecondOperand = true;
	}

	return displayValue;
}

var handleAllClearInput = function () {
	displayValue = '0';
	firstOperand = secondOperand = operator = null;
	waitingForSecondOperand = false;

	return [displayValue, firstOperand, secondOperand, operator, waitingForSecondOperand];
}


//Integration Testing Versions

var IupdateDisplay = function (value) {
	displayValue = value;
	return displayValue;
}

var IhandleNumericalInput = function (value) {
	if (waitingForSecondOperand) {
		waitingForSecondOperand = false;
	}
	else {
		value = value === '0' ? value : displayValue + value;
	}

	displayValue = functions.IupdateDisplay(value);
	return displayValue
}

var IhandleDecimalInput = function () {

	if (waitingForSecondOperand) {
		displayValue = "0.";
		waitingForSecondOperand = false;
	}
	else if (!displayValue.includes('.')) {
		displayValue += '.';
	}

	displayValue = functions.IupdateDisplay(displayValue);
	return displayValue
}

var IhandleEqualsInput = function () {
	if (operator) {
		if (firstOperand === null) {
			firstOperand = Number(firstValue);
		}
		if (secondOperand === null) {
			secondOperand = Number(secondValue);
		}

		displayValue = functions.solve(operator, firstOperand, secondOperand);

		displayString = displayValue.toString()
		if (displayString.length >= 14) {
			firstOperand = null;
			secondOperand = null;
			displayValue = '0';
			//this isn't necessarily needed, its just to simulate updating the display for integration testing
			displayValue = functions.IupdateDisplay(displayValue);
		}

		firstOperand = null;
		waitingForSecondOperand = true;
	}

	return displayValue;
}

var IhandleAllClearInput = function () {
	displayValue = '0';
	firstOperand = secondOperand = operator = null;
	waitingForSecondOperand = false;

	displayValue = functions.IupdateDisplay(displayValue);
	return displayValue
}

//Exports

const functions = {
	solve,
	handleNumericalInput,
	handleOperatorInput,
	handleDecimalInput,
	handleEqualsInput,
	handleAllClearInput,

	IupdateDisplay,
	IhandleNumericalInput,
	IhandleDecimalInput,
	IhandleEqualsInput,
	IhandleAllClearInput
}

module.exports = functions;