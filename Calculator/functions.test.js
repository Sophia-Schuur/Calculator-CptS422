const functions = require('./functions')

//Unit Testing
solve = functions.solve;
handleNumericalInput = functions.handleNumericalInput;
handleOperatorInput = functions.handleOperatorInput;
handleDecimalInput = functions.handleDecimalInput;
handleEqualsInput = functions.handleEqualsInput;
handleAllClearInput = functions.handleAllClearInput;

//Integration Testing
IupdateDisplay = functions.IupdateDisplay;
IhandleNumericalInput = functions.IhandleNumericalInput;
IhandleDecimalInput = functions.IhandleDecimalInput;
IhandleEqualsInput = functions.IhandleEqualsInput;
IhandleAllClearInput = functions.IhandleAllClearInput;




//npm test or npm run watch

//------------------testing solve functionality------------------

test('solve() | addition', () => {
	operator = '+';
	firstOperand = 6;
	secondOperand = 3;

	expect(solve(operator, firstOperand, secondOperand)).toBe(6 + 3)
})

test('solve() | subtraction', () => {
	operator = '-';
	firstOperand = 6;
	secondOperand = 3;

	expect(solve(operator, firstOperand, secondOperand)).toBe(6 - 3)
})

test('solve() | multiplication', () => {
	operator = '*';
	firstOperand = 6;
	secondOperand = 3;

	expect(solve(operator, firstOperand, secondOperand)).toBe(6 * 3)
})

test('solve() | division', () => {
	operator = '/';
	firstOperand = 6;
	secondOperand = 3;

	expect(solve(operator, firstOperand, secondOperand)).toBe(6 / 3)
})

//---------------------------------------------------------------

//EDGE CASES MILESTONE 3
//----------------testing advanced solve capability--------------
test('threeVars() | addsub', () => {
	op1 = '+';
	op2 = '-';
	firstOperand = 6;
	secondOperand = 3;
	thirdOperand = 8;

	ans = solve(op1, firstOperand, secondOperand);
	expect(solve(op2, ans, thirdOperand)).toBe(9 - 8);
})

test('threeVars() | subdiv', () => {
	op1 = '-';
	op2 = '/';
	firstOperand = 10;
	secondOperand = 6;
	thirdOperand = 2;

	ans = solve(op1, firstOperand, secondOperand);
	expect(solve(op2, ans, thirdOperand)).toBe(4 / 2);
})

test('threeVars() | multadd', () => {
	op1 = '*';
	op2 = '+';
	firstOperand = 5;
	secondOperand = 3;
	thirdOperand = 2;

	ans = solve(op1, firstOperand, secondOperand);
	expect(solve(op2, ans, thirdOperand)).toBe(15 + 2);
})

test('13Digits() | addition', () => {
	//max digits on display
	op1 = '+';
	firstOperand = 1234567890123;
	secondOperand = 1;

	expect(solve(op1, firstOperand, secondOperand)).toBe(1234567890124);
})

test('TooManyDigits()', () => {
	//make sure calc doesnt take in any more digits after 13
	waitingForSecondOperand = false;
	displayValue = '1234567890123';
	value = '1';

	expect(handleNumericalInput(value)).toBe();
})

test('DivideByZero()', () => {
	//cant divide by 0
	op1 = '/';
	firstOperand = 10;
	secondOperand = 0;

	expect(solve(op1, firstOperand, secondOperand)).toBe(Infinity);
})

test('TooManyDigitsDecimal()', () => {
	//if there is already the max digits on screen, dont add a decimal 
	//(return without doing anything)
	waitingForSecondOperand = false;
	displayValue = '1234567890123';

	expect(handleDecimalInput()).toBe()
})


//END EDGE CASES
//----------------testing handleNumbericalInput------------------

test('handleNumericalInput() | waitingForSecondOperand', () => {
	waitingForSecondOperand = true;
	displayValue = '7';
	value = '5';

	expect(handleNumericalInput(value)).toBe('5')
})


test('handleNumericalInput() | !waitingForSecondOperand', () => {
	//not waiting for the second operand means user is still inputting
	//digits to the first operand so these should be concatenated not added  
	waitingForSecondOperand = false;
	displayValue = '7';
	value = '58888';

	expect(handleNumericalInput(value)).toBe('758888')
})

//---------------------------------------------------------------

//-----------------testing handleOperatorInput-------------------

test('handleOperatorInput() | firstNull', () => {
	waitingForSecondOperand = false;
	firstOperand = null;
	displayValue = 8;
	value = '*';

	expect(handleOperatorInput(value)).toBe('*')
	//expect(firstOperand).toBe(8)
})

test('handleOperatorInput() | waitingForSecondOperand', () => {
	waitingForSecondOperand = true;
	value = '/';

	expect(handleOperatorInput(value)).toBe('/')
})

test('handleOperatorInput() | solve', () => {
	const spy = jest.spyOn(functions, 'solve');

	waitingForSecondOperand = false;
	firstOperand = 4;
	displayValue = 12;
	value = '+';

	handleOperatorInput(value);

	expect(spy).toHaveBeenCalledTimes(1)
})

test('handleOperatorInput() | operator check', () => {
	waitingForSecondOperand = false;
	firstOperand = 2;
	displayValue = 19;
	value = '-';

	expect(handleOperatorInput(value)).toBe('-')
	//expect(firstOperand).toBe(19)
})

//---------------------------------------------------------------

//-----------------testing handleDecimalInput--------------------

test('handleDecimalInput() | waitingForSecondOperand', () => {
	waitingForSecondOperand = true;
	displayValue = '0';

	expect(handleDecimalInput()).toBe('0.')
})

test('handleDecimalInput() | append decimal', () => {
	waitingForSecondOperand = false;
	displayValue = '29';

	expect(handleDecimalInput()).toBe('29.')
})

//---------------------------------------------------------------
//------------------testing handleEqualsInput--------------------
test('handleEqualsInput() | return value 1', () => {
	firstOperand = null;
	secondOperand = null;
	operator = '+'
	firstValue = '8';
	secondValue = '14';
	expect(handleEqualsInput(firstValue, secondValue)).toBe(22)
})

test('handleEqualsInput() | return value 2', () => {
	firstOperand = null;
	secondOperand = null;
	operator = '*'
	firstValue = '4032';
	secondValue = '956';
	expect(handleEqualsInput(firstValue, secondValue)).toBe(3854592)
})

test('handleEqualsInput() | return value 3', () => {
	firstOperand = null;
	secondOperand = null;
	operator = '*'
	firstValue = '0';
	secondValue = '0';
	expect(handleEqualsInput(firstValue, secondValue)).toBe(0)
})

test('handleEqualsInput() | solve called', () => {
	const spy = jest.spyOn(functions, 'solve');
	firstOperand = null;
	secondOperand = null;
	operator = '-'
	firstValue = '32';
	secondValue = '24';
	handleEqualsInput(firstValue, secondValue);
	expect(spy).toHaveBeenCalled()
})

//---------------------------------------------------------------
//-----------------testing handleAllClearInput-------------------

test('handleAllClearInput() | all null check', () => {
	displayValue = '100';
	firstOperand = 56;
	secondOperand = 24;
	operator = '*';
	waitingForSecondOperand = true;

	expect(handleAllClearInput()).toEqual(expect.arrayContaining(['0', null, null, null, false]))

})



//---------------------------------------------------------------


//--------------------Integration Testing------------------------

test('Integration handleNumericalInput() & updateDisplay() | track 1', () => {
	waitingForSecondOperand = true;
	displayValue = 7;
	value = 5;

	expect(IhandleNumericalInput(value)).toBe(5)
})

test('Integration handleNumericalInput() & updateDisplay() | track 2', () => {
	waitingForSecondOperand = false;
	displayValue = '7';
	value = '5';

	expect(IhandleNumericalInput(value)).toBe('75')
})


test('Integration handleDecimalInput() & updateDisplay() | track 1', () => {
	waitingForSecondOperand = true;
	displayValue = 'test';

	expect(IhandleDecimalInput()).toBe('0.')
})

test('Integration handleDecimalInput() & updateDisplay() | track 2', () => {
	waitingForSecondOperand = false;
	displayValue = '24';

	expect(IhandleDecimalInput()).toBe('24.')
})


test('Integration handleEqualsInput(), solve(), and updateDisplay() | track 1', () => {
	firstValue = '879';
	secondValue = '2474120';
	operator = '*';

	expect(IhandleEqualsInput()).toBe(2174751480)
})

test('Integration handleEqualsInput(), solve(), and updateDisplay() | track 2', () => {
	firstValue = '5890247267287342782753';
	secondValue = '8973879359046837892728';
	operator = '*';

	expect(IhandleEqualsInput()).toBe('0')
})


test('Integration handleAllClearInput() & updateDisplay() | track 1', () => {
	displayValue = '97889213478';

	expect(IhandleAllClearInput()).toBe('0')
})


test('solve clear solve | track 1', () => {
    firstOperand = 5;
    secondOperand = 2;
    firstOperator = '*';
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);

    thirdOperand = 3;
    secondOperator = '+';
    secondAnswer = solve(secondOperator, firstAnswer, thirdOperand)

    IhandleAllClearInput();

    firstOperand = 4.2;
    secondOperand = 3.5;
    firstOperator = "+";
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);
    
    expect(displayValue).toBe(7.7);
})


test('solve clear solve | track 2', () => {
    firstOperand = 0.999;
    secondOperand = 2;
    firstOperator = '-';
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);

    thirdOperand = 3;
    secondOperator = '+';
    secondAnswer = solve(secondOperator, firstAnswer, thirdOperand)

    IhandleAllClearInput();

    firstOperand = 5.2;
    secondOperand = 2;
    firstOperator = "/";
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);
    
    expect(displayValue).toBe(2.6);
})

test('negative math | track 1', () => {
    firstOperand = -5;
    secondOperand = 2;
    firstOperator = "*";
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);
    
    expect(displayValue).toBe(-10);
})

test('negative math | track 1', () => {
    firstOperand = -9.9;
    secondOperand = 2;
    firstOperator = "*";
    firstAnswer = solve(firstOperator, firstOperand, secondOperand);
    
    expect(displayValue).toBe(-19.8);
})

//---------------------------------------------------------------