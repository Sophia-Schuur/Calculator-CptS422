
var Calc = (function () {


	displayValue = '0';

	firstOperand = null;
	secondOperand = null;
	operator = null;

	waitingForSecondOperand = false;

	var updateDisplay = function () {
		$('.screen').val(displayValue);
	}

	var solve = function () {
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
		updateDisplay();
	}

	var handleNumericalInput = function (e) {
		if (waitingForSecondOperand) {
			displayValue = e.currentTarget.value;
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
				displayValue = displayValue === '0' ? e.currentTarget.value : displayValue + e.currentTarget.value;
			}
		}
		updateDisplay();
		//console.log(displayValue.length);
	}

	var handleOperatorInput = function (e) {
		if (firstOperand === null) {
			firstOperand = Number(displayValue);
			waitingForSecondOperand = true;
			operator = e.currentTarget.value;
		}
		else if (waitingForSecondOperand) {
			operator = e.currentTarget.value;
		}
		else {
			secondOperand = Number(displayValue);
			solve();
			operator = e.currentTarget.value;
			firstOperand = Number(displayValue);
			waitingForSecondOperand = true;
		}

		secondOperand = null;
	}

	var handleDecimalInput = function (e) {
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
		updateDisplay();
	}

	var handleEqualsInput = function (e) {
		if (operator) {
			if (firstOperand === null) {
				firstOperand = Number(displayValue);
			}
			if (secondOperand === null) {
				secondOperand = Number(displayValue);
			}
			solve();
			//check whether there are too many digits after doing operation
			displayString = displayValue.toString() //need to check length so convert number to string
			if (displayString.length >= 14)   //too many digits
			{
				alert("ERROR! Too many digts. Try another calculation.");
				//reset everything and update display to 0
				firstOperand = null;
				secondOperand = null;
				displayValue = '0';
				updateDisplay();
			}
			firstOperand = null;
			waitingForSecondOperand = true;
		}
	}

	var handleAllClearInput = function (e) {
		displayValue = '0';
		firstOperand = secondOperand = operator = null;
		waitingForSecondOperand = false;
		updateDisplay();
	}

	var start = function () {
		$('.numerical-button').click(handleNumericalInput);
		$('.all-clear-button').click(handleAllClearInput);
		$('.equals-button').click(handleEqualsInput);
		$('.operator-button').click(handleOperatorInput);
		$('.decimal-button').click(handleDecimalInput);
		$('.screen').value = '0';
	}

	return {
		start: start
	}
})();
