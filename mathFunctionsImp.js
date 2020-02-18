

const extractXReg = /([?\+ | ?-]\s*)*([0-9]+|[0-9]+.[0-9]+)*x\^*([0-9]+)*/g;

const extractNumberReg = new RegExp(
  "([?\\+ | ?-]\\s*)*(\\d+)",
  "g"
);

/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12) 
 * and looks for the derivative of it using additional functions such as:
 * 1. getPolynomialWithX(expression) {}
 * 2. derive()
*/

function derivativeOf(expression) {

    if (!expression.includes('x')) {
        return '0';
    }

    const derivative = derive(expression);

    return derivative;
}

function getPolynomialWithX(expression) { // USED FOR ALL THE EXPORTED FUNCTIONS 

      let cObj = {coef: [], c: 0};
      let pObj = {powers: [], p: 0};
      let sObj = {signs: [], s: 0};
    
      var match;
      while ((match = extractXReg.exec(expression)) != null) {

        if (match[1] == null) {
          sObj.signs[sObj.s++] = '';
        } else sObj.signs[sObj.s++] = match[1];

        if (match[2] == null) {
          cObj.coef[cObj.c++] = 1;
        } else cObj.coef[cObj.c++] = match[2]; 
        
        if (match[3] == null) {
          pObj.powers[pObj.p++] = 1;
        } else pObj.powers[pObj.p++] = match[3]; 
        
      }

      return {"cObj": cObj, "pObj": pObj, "sObj": sObj};
}

function derive(expression) {

  let coefs = getPolynomialWithX(expression).cObj.coef;
  let powers = getPolynomialWithX(expression).pObj.powers;
  let signs = getPolynomialWithX(expression).sObj.signs;

  console.log(coefs.toString());

  var derivedExpressionArray = [];

  for (let i = 0; i < coefs.length; i++) {

    var derivedPower = powers[i] - 1;
    var derivedCoef = (coefs[i] * powers[i]);

    switch (derivedPower) {
      case 0: 
        derivedExpressionArray[i] = signs[i] + derivedCoef;
        break;
      case 1: 
        if (derivedCoef == 1) {
          derivedExpressionArray[i] = signs[i] + "x";
        } else derivedExpressionArray[i] = signs[i] + derivedCoef + "x";
        break;
      default:
        derivedExpressionArray[i] = signs[i] + derivedCoef + "x^" + derivedPower;
    }
  }
  

  var derivedExpression = '';
  for (let i = 0; i < derivedExpressionArray.length; i++) {
    derivedExpression += derivedExpressionArray[i];
  }

  return derivedExpression.replace(/\s/g, '').replace(/^\+/m, '');
}


/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12) 
 * and looks for x's with a power and ordinary numbers through out two
 * separate functions: getPolynomialWithX and getNumbers
 */

function calculate(expression, value) {

  let signsOfX = getPolynomialWithX(expression).sObj.signs; // passes no sign as ''
  let coefsOfX = getPolynomialWithX(expression).cObj.coef;
  let powersOfX = getPolynomialWithX(expression).pObj.powers;
  let numbers = getNumbers(expression).nObj.numbers;
  let signsOfNumbers = getNumbers(expression).sObj.signs; // passes no sign as ''

  var answer = 0;
  var unit = 0;
  for (let i = 0; i < coefsOfX.length; i++) {
    unit = Number(coefsOfX[i] * Math.pow(value, powersOfX[i]));
    if (signsOfX[i].toString().trim() == '+' || signsOfX[i] == '') {
      answer += unit;
    } else answer -= unit;
  }

  for (let i = 0; i < numbers.length; i++) {
    if (signsOfNumbers[i].toString().trim() == '+' || signsOfNumbers[i].toString().trim() == '') {
      answer += Number(numbers[i].toString().trim());
    } else answer -= Number(numbers[i].toString().trim());
  }

  return answer.toString().replace(/\s/g, '');

}

function getNumbers(expression) {
  
  let numbersInExpression = expression.replace(
    /([?\+ | ?-]\s*)*(\d+|[0-9]+.[0-9]+)*x\^*(\d+)*/g, 
    ''
    );

    let sObj = {signs: [], s: 0};
    let nObj = {numbers: [], n: 0};

    var match;

    while ((match = extractNumberReg.exec(numbersInExpression)) != null) {

      if (match[1] == null) {
        sObj.signs[sObj.s++] = '';
      } else sObj.signs[sObj.s++] = match[1];

      nObj.numbers[nObj.n++] = match[2];
    }

    return {"sObj": sObj, "nObj": nObj};
}

function integralOf(expression) {
  
  let coefsOfX = getPolynomialWithX(expression).cObj.coef;
  let powersOfX = getPolynomialWithX(expression).pObj.powers;
  let signsOfX = getPolynomialWithX(expression).sObj.signs; // passes no sign as ''
  let numbers = getNumbers(expression).nObj.numbers;
  let signsOfNumbers = getNumbers(expression).sObj.signs; // passes no sign as ''

  // WORKING ON X's
  var integratedExpression = '';
  var integratedPower;
  var integratedUnit;
  for (let i = 0; i < powersOfX.length; i++) {
    integratedPower = Number(powersOfX[i]) + 1;
    var integratedCoef = Number((coefsOfX[i]/integratedPower).toFixed(2));
    if (integratedCoef == 1) {
      integratedCoef = '';
    }
    integratedUnit = signsOfX[i] + integratedCoef + 'x^' +  integratedPower;
    integratedExpression += integratedUnit;  
  }

  var answer = integratedExpression;
  // WORKING ON NUMBERS

  for (let i = 0; i < numbers.length; i++) {
    var integralOfConst = signsOfNumbers[i] + numbers[i] + 'x';
    answer += integralOfConst;
  }

return answer.toString().replace(/\s/g, '');
}

function randomFunction() {

  var finalFunction = '';

  const amountOfXsToThePower = Math.ceil(Math.random()*2);
  const amountOfNumbers = Math.ceil(Math.random());
  console.log(amountOfNumbers);console.log(amountOfXsToThePower);

  var poweredXs = [];
  var power = '';
  for (let i = 0; i < amountOfXsToThePower; i++) {
    power  = Number(1 + Math.random()*3).toFixed(0);
    if (power == 1) {
      poweredXs[i] = 'x';
    } else  poweredXs[i] = 'x^' + power;
  }

  var numbers = [];
  for (let i = 0; i < amountOfNumbers; i++) {
    numbers[i] = Number(1 + Math.random() * 20).toFixed(0);
  }

  var min;

  if (amountOfNumbers <= amountOfXsToThePower) {
    min = amountOfNumbers;
  } else min = amountOfXsToThePower;

  var max;
  var moreNumbers = false;
  if (amountOfNumbers > amountOfXsToThePower) {
    max = amountOfNumbers;
    moreNumbers = true;
  } else max = amountOfXsToThePower;

  var signForX = '';
  var signForNumber;
  var signChooser = Number(Math.random()*2).toFixed(0);
  if (signChooser == 0) signForNumber = ' + ';
  else signForNumber = ' - ';
  var unit;
  for (let i = 0; i < min; i++) {
    unit = signForX + poweredXs[i] + signForNumber + numbers[i];
    finalFunction += unit;
    signChooser = Number(Math.random() * 2).toFixed(0);
    if (signChooser == 0) signForX = ' + ';
    else signForX = ' - ';
  }

  for (let i = 0; i < max - min; i++) {
    signChooser = Number(Math.random() * 2).toFixed(0);
    if (signChooser == 0) signForX = ' + ';
    else signForX = ' - ';
    if (moreNumbers) {
      unit = signForX + numbers[min - 1 + i];
    } else {
      unit = signForX + poweredXs[min - 1 + i];
    }

    finalFunction += unit;
  }

 return finalFunction;
}

function randomFunctionArray() {

  var array = [];

  for (let i = 0; i < 200; i++) {
    array[i] = randomFunction();
  }

  return array;
}

console.log(randomFunctionArray());