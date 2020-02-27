const extractXReg = /\s*([\+|-]*)\s*(\d+\/\d+|\d+\.\d+|\d+)*x\^*(\d+)*\s*/g;
const extractNumberReg = /\s*([\+|-]*)\s*(\d+\/\d+|\d+\.\d+|\d+)\s*/g;

//
// MAIN FUNCTIONS
//

function derivativeOf(expression) {

    if (!expression.includes('x')) {
        return '0';
    }

    return derive(expression);
}

function derive(expression) {

    let fractionalExpression = getExpressionInFractions(expression);
    let polynomials = getPolynomialWithX(fractionalExpression);
    let coefs = polynomials.cObj.coef;
    let powers = polynomials.pObj.powers;
    let signs = polynomials.sObj.signs;
    signs = turnNullToPlus(signs);
    let derivedExpressionArray = [];
    let derivedPower = '';
    let derivedCoef = '';

    for (let i = 0; i < coefs.length; i++) {

        derivedPower = Number(powers[i]) - 1;
        if (coefs[i] == 1) coefs[i] += '/1';
        
        derivedCoef = multiplyFractions(signs[i], coefs[i], '+', powers[i] + '/1');
        switch (derivedPower) {
            case 0:
                derivedExpressionArray[i] = signs[i] + derivedCoef;
                break;
            case 1:
                if (derivedCoef == 1 || derivedCoef == -1) {
                    derivedExpressionArray[i] = signs[i] + "x";
                } else {
                    derivedExpressionArray[i] = signs[i] + derivedCoef + "x";
                }
                break;
            default:
                if (derivedCoef == 1 || derivedCoef == -1) {
                    derivedExpressionArray[i] = signs[i] + "x^" + derivedPower;
                } else derivedExpressionArray[i] = signs[i] + derivedCoef + "x^" + derivedPower;
        }
    }

    let derivedExpression = '';
    for (let i = 0; i < derivedExpressionArray.length; i++) {
        derivedExpression += derivedExpressionArray[i];
    }
    derivedExpression = simplify(derivedExpression).simplifiedFractional;

    return derivedExpression.replace(/^\+/, '');
}

console.log(simplify('1/2x^2 + 2x^2 + 4.5x^3 - 5/2x^2 + 5.2').simplifiedFractional);

/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12) 
 * and looks for x's with a power and ordinary numbers through out two
 * separate functions: getPolynomialWithX and getNumbers
 */

function calculate(expression, value) {

    let xExtractor = getPolynomialWithX(expression);
    let signsOfX = xExtractor.sObj.signs; 
    let coefsOfX = xExtractor.cObj.coef;
    let powersOfX = xExtractor.pObj.powers;

    let answer = 0;
    let unit = 0;

    for (let i = 0; i < coefsOfX.length; i++) {
        unit = Number(coefsOfX[i] * Math.pow(value, powersOfX[i]));
        if (signsOfX[i].toString() == '+' || signsOfX[i] == '') {
            answer += unit;
        } else if (signsOfX[i].toString() == '-') {
            answer -= unit;
        } else throw new Error('Misread sign of x');
    }

    let numberExtractor = getNumbers(expression);
    let numbers = numberExtractor.nObj.numbers;
    let signOfNumber = numberExtractor.sObj.signs; 

    for (let i = 0; i < numbers.length; i++) {
        if (signOfNumber[i].toString() == '+' || signOfNumber[i].toString() == '') {
            answer += Number(numbers[i]);
        } else if (signOfNumber[i].toString() == '-') {
            answer -= Number(numbers[i]);
        } else throw new Error('Misread sign of the number' + numbers[i]);
    }

    return answer.toString();
}

/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12)
 * and looks for x's with a power and ordinary numbers through out two
 * separate functions: getPolynomialWithX and getNumbers
 * and returns indefinite integral as the answer
 */

function integralOf(expression) {

    // WORKING ON X's

    let xExtractor = getPolynomialWithX(expression);
    let coefsOfX = xExtractor.cObj.coef;
    let powersOfX = xExtractor.pObj.powers;
    let signsOfX = xExtractor.sObj.signs; 

    let integratedExpression = '';
    let integratedPower;
    let integratedUnit;
    for (let i = 0; i < powersOfX.length; i++) {
        integratedPower = Number(powersOfX[i]) + 1;
        let integratedCoef = coefsOfX[i] + '/' + integratedPower;
        if (coefsOfX[i] / integratedPower == 1) {
            integratedCoef = '';
        }
        integratedUnit = signsOfX[i] + integratedCoef + 'x^' + integratedPower;
        integratedExpression += integratedUnit;
    }

    let answer = integratedExpression;

    // WORKING ON NUMBERS

    let numberExtractor = getNumbers(expression);
    let numbers = numberExtractor.nObj.numbers;
    let signsOfNumbers = numberExtractor.sObj.signs;
    for (let i = 0; i < numbers.length; i++) {
        let integralOfConst = signsOfNumbers[i] + numbers[i] + 'x';
        answer += integralOfConst;
    }

    return answer.toString().replace(/\s/g, '');
}

//
//LOW-LEVEL EXTRACTORS HELPERS
//

function processXOverNumber(expression) {

    const regXOverNumberWithPower = /\((\d+)*x\/(\d+)\)\^(\d+)/g;

    let match;
    let numerator = 0;
    let denominator = 0;
    let power = 0;
    while ((match = regXOverNumberWithPower.exec(expression)) != null) {
        numerator = match[1];
        denominator = match[2];
        power = match[3];
        let unitToReplace = '';
        if (numerator == null) {
            numerator = 1;
            unitToReplace = '(' + 'x/' + denominator + ')^' + power
        } else unitToReplace = '(' + numerator + 'x/' + denominator + ')^' + power;

        expression = expression.replace(
            unitToReplace,
            Math.pow(numerator, power) + '/' + Math.pow(denominator, power) + 'x^' + power
        );
    }

    const regXOverNumberWithoutPower = /(\d*)x\/(\d+)/g;

    while ((match = regXOverNumberWithoutPower.exec(expression)) != null) {
        numerator = match[1];
        if (numerator == '') numerator = 1;
        denominator = match[2];
        expression = expression.replace(regXOverNumberWithoutPower, numerator + '/' + denominator + 'x');
    }

    return expression;
}

//
// LOW-LEVEL EXTRACTORS
//

function getPolynomialWithX(expression) {

    expression = processXOverNumber(expression);

    let cObj = {
        coef: [],
        c: 0
    };

    let pObj = {
        powers: [],
        p: 0
    };

    let sObj = {
        signs: [],
        s: 0
    };

    let match;
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

    return {
        "cObj": cObj,
        "pObj": pObj,
        "sObj": sObj
    };
}

function getNumbers(expression) {

    expression = processXOverNumber(expression);

    let numbersInExpression = expression.replace(
        extractXReg,
        ''
    );

    let sObj = {
        signs: [],
        s: 0
    };
    let nObj = {
        numbers: [],
        n: 0
    };

    let match;

    while ((match = extractNumberReg.exec(numbersInExpression)) != null) {

        if (match[1] == null) {
            sObj.signs[sObj.s++] = '';
        } else sObj.signs[sObj.s++] = match[1];

        nObj.numbers[nObj.n++] = match[2];
    }

    return {
        "sObj": sObj,
        "nObj": nObj
    };
}


// 
// HIGH-LEVEL EXTRACTORS
//

function getExpressionInDecimals(expression) {

    expression = processXOverNumber(expression);

    const reg = /(\d+)\/(\d+)/g;

    let numerators = [];
    let N = 0;
    let denominators = [];
    let D = 0;

    let match;
    while ((match = reg.exec(expression)) != null) {
        numerators[N++] = match[1];
        denominators[D++] = match[2];
    }


    return expression;
}


function getExpressionInFractions(expression) { // I will have to rewrite expression from the scratch
    // processing decimals
    const reg = /\d+\.\d+/g;

    let match;
    let decimalNumbers = [];
    let DN = 0;
    while ((match = reg.exec(expression)) != null) {
         decimalNumbers[DN++] = match;
    }

    let decimalPlaces = 0;
    let decimalPart = 0;
    let intPart = 0;
    let fractions = [];
    for (let i = 0; i < decimalNumbers.length; i++) {
            decimalPlaces = decimalNumbers[i].toString().split('.')[1].length;
            decimalPart = decimalNumbers[i].toString().split('.')[1];
            intPart = decimalNumbers[i].toString().split('.')[0];
            if (intPart == 0) intPart = '';
            fractions[i] = intPart + '' + decimalPart + '/' + Math.pow(10, decimalPlaces);

        expression = expression.replace(decimalNumbers[i], fractions[i]);
    }
    //processing integer coefs
    const coefs = getPolynomialWithX(expression).cObj.coef;
    const signs = getPolynomialWithX(expression).sObj.signs;
    const signsOfNumbers = getNumbers((expression)).sObj.signs;
    const numbers = getNumbers(expression).nObj.numbers;
    let fractionalCoef;
    let fractionalNumber;
    let units = expression.toString().split(/\s*\+\s*|\s*-\s*/);
    let newExpression = '';
    for (let i = 0; i < units.length; i++) {
        if (i == coefs.length) {
            if (numberIsInteger(numbers[i-coefs.length])) {
                fractionalNumber = number + '/1';
                units[i] = units[i].toString().replace(number[i - coefs.length], fractionalNumber);
            }
            newExpression = newExpression + signsOfNumbers + units[i];
        } else {
            if (coefIsInteger(coefs[i])) {
                fractionalCoef = coefs[i] + '/1';
                units[i] = units[i].toString().replace(coefs[i], fractionalCoef);
            }
        
            newExpression = newExpression + signs[i] + units[i];
        }   
    }

    return newExpression.replace(/^\+/, '');
}

function coefIsInteger(coef) {
    if (!coef.toString().includes('.') && !coef.toString().includes('/')) return true;
    else return false;
}

function numberIsInteger(number) {
    if (!number.toString().includes('.') && !number.toString().includes('/')) return true;
    else return false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////


function simplify(expression) {

    let fractionalExpression = getExpressionInFractions(expression);
    let expressionWithX = getPolynomialWithX(fractionalExpression);
    let coefsOfX = expressionWithX.cObj.coef;
    let powersOfX = expressionWithX.pObj.powers;
    let signsOfX = expressionWithX.sObj.signs;
    let numbersExpression = getNumbers(fractionalExpression);
    let numbers = numbersExpression.nObj.numbers;
    let signsOfNumbers = numbersExpression.sObj.signs;

    signsOfX = turnNullToPlus(signsOfX);
    signsOfNumbers = turnNullToPlus(signsOfNumbers);

    let simplifiedFractional = simplifyFractions(sumUpXFractions(signsOfX, coefsOfX, powersOfX)) + simplifyFractions(sumUpNumbers(numbers, signsOfNumbers));
    let simplifiedDecimal = getExpressionInDecimals(simplifiedFractional);


    return {
        "simplifiedFractional": simplifiedFractional.replace(/^\+/, ''),
        "simplifiedDecimal": simplifiedDecimal.replace(/^\+/,'')
    };
    
}

function turnNullToPlus(signs) {
    for (let i = 0; i < signs.length; i++) {
        if (signs[i] == '') signs[i] = '+';
    }
    return signs;
}

function getSamePowers(powersOfX) {

    let equalPowersPositions = [];
    let EPP = 0;
    let equalPowers = [];
    let EP = 0;

    for (let i = 0; i < powersOfX.length; i++) {

        let notChecked = true;
        for (let k = 0; k < equalPowersPositions.length; k++) {
            for (let l = 0; l < equalPowersPositions[k].length && notChecked; l++) {
                if (i == equalPowersPositions[k][l]) {
                    notChecked = false;
                }
            }
        }

        let haveTheSamePowers = false;
        let powersCollector = [];
        let PC = 1;
        if (notChecked) {
            for (let j = i + 1; j < powersOfX.length; j++) {
                if (powersOfX[i] == powersOfX[j]) {
                    powersCollector[PC++] = j;
                    haveTheSamePowers = true;
                }
            }
            if (haveTheSamePowers) {
                powersCollector[0] = i;
                equalPowersPositions[EPP++] = powersCollector;
                equalPowers[EP++] = powersOfX[i];
            }
        }
    }

    return {
        "equalPowersPositions": equalPowersPositions, // returns 2D array
        "equalPowers": equalPowers
    };
}

function getSingleCoefPositions(samePowersPositions, coefsOfXDecimal) {
    let repetitiveCoefsPosition = [];
    let RC = 0;
    for (let i = 0; i < samePowersPositions.length; i++) {
        for (let j = 0; j < samePowersPositions[i].length; j++) {
            repetitiveCoefsPosition[RC++] = samePowersPositions[i][j];
        }
    }

    let singleCoefsPosition = [];
    let SC = 0;
    for (let i = 0; i < coefsOfXDecimal.length; i++) {
        let notProcessed = true;
        for (let j = 0; j < repetitiveCoefsPosition.length && notProcessed; j++) {
            if (i == repetitiveCoefsPosition[j]) {
                notProcessed = false;
            }
        }
        if (notProcessed) {
            singleCoefsPosition[SC++] = i;
        }
    }
    return singleCoefsPosition;
}

//
// FRACTION OPERATIONS
//

function sumFractions(signf1, f1, signf2, f2) {

    const reg = /(\d+)\/(\d+)/;

    let numAndDenomf1 = reg.exec(f1);
    let num1 = Number(numAndDenomf1[1]);
    let denom1 = Number(numAndDenomf1[2]);
    
    let numAndDenomf2 = reg.exec(f2);
    let num2 = Number(numAndDenomf2[1]);
    let denom2 = Number(numAndDenomf2[2]);
    
    
    let finalNumerator1;
    let finalNumerator2;
    if (signf1 == '+') {
        finalNumerator1 = num1 * denom2;
    } else finalNumerator1 = Number(-num1 * denom2);
    if (signf2 == '+') {
        finalNumerator2 = num2 * denom1;
    } else finalNumerator2 = Number(-num2 * denom1);

    let finalDenominator = denom1 * denom2;

    if (Number(finalNumerator1 + finalNumerator2) > 0) {
        return {
            "signOfFraction": '+',
            "fraction": Number(finalNumerator1 + finalNumerator2) + '/' + finalDenominator
        };
    } else if (Number(finalNumerator1 + finalNumerator2) < 0) {
        return {
            "signOfFraction": '-',
            "fraction": Number(finalNumerator1 + finalNumerator2) + '/' + finalDenominator
        };
    }

    return {
        "signOfFraction": '',
        "fraction": ''
    };
}

function multiplyFractions(signf1, f1, signf2, f2) {

    const reg = /(\d+)\/(\d+)/;

    if (coefIsInteger(f1)) f1 = f1 + '/1';
    if (coefIsInteger(f2)) f2 = f2 + '/1';
    let numAndDenomf1 = reg.exec(f1);
    let num1 = Number(numAndDenomf1[1]);
    let denom1 = Number(numAndDenomf1[2]);
    
    let numAndDenomf2 = reg.exec(f2);
    let num2 = Number(numAndDenomf2[1]);
    let denom2 = Number(numAndDenomf2[2]);

    let finalNumerator;
    if (signf1 == signf2) {
        finalNumerator = num1 * num2;
    } else finalNumerator = Number(-num1 * num2);

    if (finalNumerator == Number(denom1 * denom2)) return 1;
    if (Number(finalNumerator.toString().replace(/^-/, '')) == Number(denom1 * denom2)) return -1;
    if (finalNumerator < 0) finalNumerator = finalNumerator.toString().replace(/^-/, '');
    return finalNumerator + '/' + Number(denom1 * denom2);
}



function devideFractions(signf1, f1, signf2, f2) {

    const reg = /(\d+)\/(\d+)/;
    let numAndDenomf2 = reg.exec(f2);
    let num2 = Number(numAndDenomf2[1]);
    let denom2 = Number(numAndDenomf2[2]);
    f2 = denom2 + '/' + num2;

    return multiplyFractions(signf1, f1, signf2, f2);
}

//
//
//

function sumUpSamePowersFractions(signsOfXFractions, coefsOfFractions, powersOfFractions) {

    const reg = /(\d+)\/(\d+)/;

    let powersProcessor = getSamePowers(powersOfFractions);
    let samePowersPositions = powersProcessor.equalPowersPositions;
    let powers = powersProcessor.equalPowers;

    let simplified = '';
    for (let i = 0; i < samePowersPositions.length; i++) {

        let finalSign = signsOfXFractions[samePowersPositions[i][0]];
        let finalCoef = coefsOfFractions[samePowersPositions[i][0]];
        for (let j = 1; j < samePowersPositions[i].length; j++) {
            let sumedUpFractionObj = sumFractions(
                finalSign, 
                finalCoef, 
                signsOfXFractions[samePowersPositions[i][j]], 
                coefsOfFractions[samePowersPositions[i][j]]
            );

            finalSign = sumedUpFractionObj.signOfFraction;
            finalCoef = sumedUpFractionObj.fraction;
        }
        if (reg.exec(finalCoef)[1] != 0) {

            if (finalSign == '-') finalSign = '';

            if (powers[i] == 1) {
                simplified += finalSign + finalCoef + 'x';
            } else simplified += finalSign + finalCoef + 'x^' + powers[i];
        }
    }

    return {
        "simplified": simplified,
        "samePowersPositions": samePowersPositions
    };
}
    
function sumUpXFractions(signsOfXFractional, coefsOfXFractional, powersOfXFractional) {

    let sumUpSamePowersDecimalsObj = sumUpSamePowersFractions(signsOfXFractional, coefsOfXFractional, powersOfXFractional);
    let simplified = sumUpSamePowersDecimalsObj.simplified;
    let samePowersPositions = sumUpSamePowersDecimalsObj.samePowersPositions;

    let singleCoefsPositions = getSingleCoefPositions(samePowersPositions, coefsOfXFractional);
    let positionNumber;
    for (let i = 0; i < singleCoefsPositions.length; i++) {
        positionNumber = singleCoefsPositions[i];
        if (powersOfXFractional[positionNumber] == 1) {
            simplified += signsOfXFractional[positionNumber] + coefsOfXFractional[positionNumber] + 'x';
        } else {
            simplified += signsOfXFractional[positionNumber] + coefsOfXFractional[positionNumber] + 'x^' + powersOfXFractional[positionNumber];
        }
    }
    return simplified;
}

function sumUpNumbers(numbers, signsOfNumbers) {
    
    let finalSign =  signsOfNumbers[0];
    let finalNumber = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        let sumedUpFractionObj = sumFractions(
            finalSign,
            finalNumber,
            signsOfNumbers[i],
            numbers[i]
        );
        
        finalSign = sumedUpFractionObj.signOfFraction;
        finalNumber = sumedUpFractionObj.fraction;
    }

    if (finalSign == '-') finalSign = '';
    // if (isNaN(finalNumber)) return '';

    return finalSign + finalNumber;
}

function GCD(a, b) {
    let remainder;
    while (a > 0) {
        remainder = b % a;
        b = a;
        a = remainder;
    }
    return b;
}

function simplifyFractions(expression) {

    const reg = /(\d+)\/(\d+)/g;

    let numerators = [];
    let N = 0;
    let denominators = [];
    let D = 0;

    let match;
    while ((match = reg.exec(expression)) != null) {
        numerators[N++] = match[1];
       denominators[D++] = match[2];
    }

    let fixedNumerator;
    let fixedDenominator;
    for (let i = 0; i < numerators.length; i++) {

        let gcd = GCD(numerators[i], denominators[i]);
        fixedNumerator = Number(numerators[i]) / gcd;
        fixedDenominator = Number(denominators[i]) / gcd;

        if (fixedDenominator == 1) expression = expression.replace(numerators[i] + '/' + denominators[i], fixedNumerator);
        
        expression = expression.replace(numerators[i] + '/' + denominators[i], fixedNumerator + '/' + fixedDenominator);
    }

    return expression;
}

/////////////////////////////////////////////////////////////////

function compareDerivatives(userAnswer, func) {
    const correctDerivative = derivativeOf(func);
    return compare(userAnswer, correctDerivative);
}

function compareCalculations(userAnswer, func, value) {
    const correctCalculation = calculate(func, value);
    if (userAnswer == correctCalculation) {
        return true;
    } else return false;
}

function compareIntegrals(userAnswer, func) {
    const correctIntegral = integralOf(func);
    return compare(userAnswer, correctIntegral)
}

//
// MAIN COMPARE HEPLERS
//

function compare(userAnswer, correctAnswer) {

    let userSimplified = simplify(userAnswer);
    let userAnswerDecimal = userSimplified.simplifiedDecimal;
    let userAnswerFractional = userSimplified.simplifiedFractional;

    let correctAnswerSimplified = simplify(correctAnswer);
    let correctAnswerDecimal = correctAnswerSimplified.simplifiedDecimal;
    let correctAnswerFractional = correctAnswerSimplified.simplifiedFractional;

    if (numbersNotEqual(userAnswerDecimal, userAnswerFractional, correctAnswerDecimal, correctAnswerFractional)) return false;

    const usersExpressionXDecimal = processExpressionForCompare(userAnswerDecimal);
    const usersExpressionXFractional = processExpressionForCompare(userAnswerFractional);

    const correctExpressionXDecimal = processExpressionForCompare(correctAnswerDecimal);
    const correctExpressionXFractional = processExpressionForCompare(correctAnswerFractional);

    if (usersExpressionXDecimal.length != correctExpressionXDecimal.length) return false;

    let expressionsAreEqual = false;
    let numberOfElementsRemaining = usersExpressionXDecimal.length;
    for (let i = 0; i < usersExpressionXDecimal.length; i++) {
        for (let j = 0; j < correctExpressionXDecimal.length; j++) {
            if (
                usersExpressionXDecimal[i] == correctExpressionXDecimal[j] || 
                usersExpressionXFractional[i] == correctExpressionXFractional[j]
                ) {
                    numberOfElementsRemaining--;
            }
        }
    }

    if (numberOfElementsRemaining == 0) {
        expressionsAreEqual = true;
    }

    return expressionsAreEqual;
}
      
function numbersNotEqual(
    userAnswerDecimal,
    userAnswerFractional,
    correctAnswerDecimal,
    correctAnswerFractional
    ) {

    let numberOfUserDecimal = getNumbers(userAnswerDecimal).sObj.signs[0] + getNumbers(userAnswerDecimal).nObj.numbers[0];
    let numberOfUserFractional = getNumbers(userAnswerFractional).sObj.signs[0] + getNumbers(userAnswerFractional).nObj.numbers[0];

    let correctNumberDecimal = getNumbers(correctAnswerDecimal).sObj.signs[0] + getNumbers(correctAnswerDecimal).nObj.numbers[0];
    let correctNumberFractional = getNumbers(correctAnswerFractional).sObj.signs[0] + getNumbers(correctAnswerFractional).nObj.numbers[0];

    if (isNaN(numberOfUserDecimal)) {
        numberOfUserDecimal = 0;
        numberOfUserFractional = 0;
    }

    if (isNaN(correctNumberDecimal)) {
        correctNumberDecimal = 0;
        correctNumberFractional = 0;
    }

    if (
        Number(numberOfUserDecimal) == Number(correctNumberDecimal) || 
        Number(numberOfUserFractional) == Number(correctNumberFractional)
        )
        {return false;} else return true;
}

function processExpressionForCompare(expression) {

    const xExtractor = getPolynomialWithX(expression);

    let xExpression = [];

    for (let i = 0; i < xExtractor.cObj.coef.length; i++) {
        let coef = xExtractor.cObj.coef[i];
        if (coef == 1) coef = '';

        let power = xExtractor.pObj.powers[i];
        if (power == 1) power = 'x';
        else power = 'x^' + power;

        let sign = xExtractor.sObj.signs[i];
        if (sign == '') sign = '+';
        xExpression[i] = sign + coef + power;
    }

    return xExpression;
}

const _derivativeOf = derivativeOf;
export { _derivativeOf as derivativeOf };
const _calculate = calculate;
export { _calculate as calculate };
const _integralOf = integralOf;
export { _integralOf as integralOf };
const _compareDerivatives = compareDerivatives;
export { _compareDerivatives as compareDerivatives };
const _compareCalculations = compareCalculations;
export { _compareCalculations as compareCalculations };
const _compareIntegrals = compareIntegrals;
export { _compareIntegrals as compareIntegrals };