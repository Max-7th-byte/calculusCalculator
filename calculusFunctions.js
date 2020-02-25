
const extractXReg = /\s*([\+|-]*)\s*(\d+\/\d+|\d+\.\d+|\d+)*x\^*(\d+)*\s*/g;
const extractNumberReg = /\s*([\+|-]*)\s*(\d+\/\d+|\d+\.\d+|\d+)\s*/g;


const functionDatabase = [
    '-2x+x^5-x^4-x^2-18', '-2x^4+x^2-10', '-x^3-x^2-11',
    '-x^4+x^3-x^5+22', '-2x^3+x^2-16', '-2x^5+x^4+17',
    '-2x^3-x^5-9', '2x^2-2x^3+25', '2x^2-x^3-x^4-x-12',
    '2x-2x^3+x^2-32', '-x^4-x^2+x^5-23', '-x^2-x^4-x-17',
    '-2x^2+x^4-28', 'x^4-x^2-x^5-17', '-2x^2-x^4-24',
    '-2x^4-x^3-15', '-3x^4+x^3-27', '2x^3-x^4-x^5-14',
    '-x-x^3+x^2-16', '-2x-2x^2+x^5-12', 'x^2-x^4-x^3+20',
    '-x^4-x^3-13', '2x^2-2x-x^4+15', '-x^3-x^4+14',
    '-2x^4+x^2-x^5-12', '-x^4-x^3-20', '2x^3-x^4+12',
    '-x^4+x^2-x^3-18', '-2x^2+x^4-14', '-2x+x^3-x^2+x^4+21',
    '-2x^2+x^5-30', '-2x^5-x^4-8', '-x^5-x^3-21',
    '-3x^2+x^5-x^4-10', '-2x^4+x^2-x^5-9', '-x^4+x^3-x^2-8',
    '2x^2-2x^4+13', '-2x^2+x^4-20', '-2x^4+x-x^2-x^3-26',
    '-2x^2+x^3-21', '-x^2-x^3-18', '-2x^2-x^3-30',
    '2x^4-x^2-20', '-x^3+x^4-x^2-13', '-2x^4+x^5-9',
    '2x^5-x^2-x^4-x^3-18', 'x-x^5-x^3-2', '-2x^4-x^3-19',
    '2x^2+x^3-x^5-36', '-x^2-x^3-x+14', '-2x^2+x^4+x^3+29',
    '-x^4+x^5-x^3-20', '-2x^3+x^2+x^4-23', '2x^5-2x^3+17',
    '2x^4-x^2+18', '-2x^2+x^3-24', '-x^2-2x^3-21',
    '-2x^5+x^2-x^4-x-7', '-x^3-2x^2+30', '-3x^5+x^3-x^2-26',
    '-2x^3+x^2-23', '-x^4-2x^5-7', '-3x^3+x^2-32',
    '2x^5+x^2-16', '2x^3-x-x^5-12', '2x^4-2x^2-15',
    '2x^4-x-x^3+8', '2x^2-x^3-21', '-2x^2+x^5-24',
    '2x^4-2x^2-x^3-24', '2x^4-2x^2-23', '-2x^2+x^5+19',
    '-2x^3+x^2-10', '2x^3+x-x^2-26', '-x^3-x^4-x^2-20',
    '2x^5-2x^3-1', '-x^2-x^5+x-4', '2x^3-2x^5-x^2-16',
    '-x^3-x^2+38', 'x^2-x+x^4-18', '2x^4-x^2+x^3-5',
    '-2x^2-x^3-6', '-x^3-x^4-x^2+12', '-3x^3+x^5+15',
    '2x^4-x^5+24', '-2x^4+x^3-x^5+30', '-x^4-x^3-19',
    '-x^2+x^3-13', '-x^5-x^4+10', '-x^3-x^4-12',
    '-x-x^2-x^4-12', 'x^2+x^4+x+24', '2x^5-x^2+20',
    'x^4+x^2-x^3-20', 'x^2-2x^5-13', '-x^2-2x^4-15',
    '-x^4+x^2+11', '-2x^3+x^5-x^4-x^2-21', '2x^3-2x^4+x^5-26',
    '-2x^3+x^2+x^5-32', '-x^3-x^5-31', '-x^2-x^5-19',
    '-x^5-x^4-x-19', '-2x^3-x^4+5', 'x^5-2x^2-15',
    '-x-x^5-x^4-32', '-2x^2+x-x^3+21', '-2x^3+x^4-x^2-29',
    '2x^3-x^5+x^4-x-12', '-2x^5+x^2-22', '-2x-2x^4+x^3-23',
    '-2x^3+x^2-27', '-2x^3+x^2+x+x^5-29', '2x^4-x^2-x^3+21',
    '-3x^4+x^2-x^3+26', '2x^5-x^2-x-x^3-3', '-2x^2+x^3+9',
    '-2x^5-x^2-8', '-2x^2+x-x^3-37', '-3x^3+x^5+x-25',
    '-2x^2+x^3-x^4-38', '-x^4-x-x^3-11', '-x^3-x^4+34',
    '-x^4-2x^2+17', '-2x^5+x^3-x^4-x-19', '-x^2+x^4-x^5-25',
    'x+x^4-x^5-17', '-2x^3+x^5-9', '-2x^4+x^3-24',
    '-2x^4+x^5+x^2-29', '-x^3+x-x^5-18', 'x^4-x^2-x-17',
    '-x^3+x^4-x^5+10', '-x^2+x^4-x^3+25', '-x^3-x^5-19',
    '-3x^2+x^3+x-25', '2x^2-3x^4-17', '-2x^4+x^2-x^3-x-29',
    '2x^5-x^4-11', '-x+x^4-x^3-17', '-2x-2x^2+x^4-29',
    '-x^5+x^4-16', '-2x^3+x^2-x^5-24', '-x^2-x^4+x^3-4',
    'x^3-2x^2+22', '-2x^4+x^5+36', '3x^3-x^2+31',
    '-x^2+x^4-x^5-24', '-2x^2-x^4-15', '-x^2-x^3-19',
    '-2x+x^4+x^2-23', '2x-x^3-x^2-x^5-5', '-2x^2+x^4-x^3+x-8',
    '2x^5-x^3-13', '-x^2-x^3-x^4-20', '2x^4+x^2-x-27',
    '-3x+x^5+x^2-32', '-2x^2+x^5+x-x^4-24', '-2x^2+x^4-x-x^5-16',
    'x-x^4-x^5+21', '2x^2-2x^4-x^3-18', '2x^2-2x^5-x-13',
    '2x^4-2x^5-x^2-12', '-x^2-x^4-x-19', '-2x^2+2x^3+x^5-18',
    '-2x+x^4+x^2-x^3-13', '2x^2+x^4-x^3-22', '-2x^3-x^5-11',
    '-2x^3+x^2-26', '-2x^3-x^4-7', '-2x^5+x^2-29',
    '-x^4+x^2-x-2', '-2x^2-x^4-3', '-2x^3+x^4-32',
    '-2x+x^5-x^3-18', '2x^4+x^2-x-16', 'x^3-x^5-x^4-5',
    '-x+x^5-x^2-10', 'x^5-x-x^3-31', '-2x^5+x^4-x^2-27',
    '-2x^2-x^4-18', 'x^3-x^2-x^4-7', '-2x^2-x^3+16',
    '-2x^4+x^5-14', '-2x^2+x^3-24', '-2x^2+x^3+31',
    '-x^4-x^5-11', '-2x^4+x^2-22', '-2x^3+x^2-21',
    '-x+x^2-x^3-25'
];

/**
 * Store two instansese of the expression -- decimal and fractional one !!! (maybe two different simplify functions will be used) !!!
 * Then in a loop compare user's simplified unit of the answer with two units of 
 * the correct answer. If there is a match -- count it as correct.
 * 
 * Two different instanses will be returned in functions derive & integralOf
 * 
 * Functions getPolynomialWithX and getNumbers need a refactor in order to detect any type of a const/number
 * extractXReg and extractNumberReg will be rewritten as improved once, which will be capable of finding any type of number
 */


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

    let decimals = [];
    for (let i = 0; i < numerators.length; i++) {
        decimals[i] = Number(numerators[i] / denominators[i]);
        expression = expression.replace(numerators[i] + '\/' + denominators[i], decimals[i]);
    }

    return expression;
}


function getExpressionInFractions(expression) {

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

    return expression;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////


function simplify(expression) {

    let decimalExpression = getExpressionInDecimals(expression);
    let decimalExpressionWithX = getPolynomialWithX(decimalExpression);
    let coefsOfXDecimal = decimalExpressionWithX.cObj.coef;
    let powersOfXDecimal = decimalExpressionWithX.pObj.powers;
    let signsOfXDecimal = decimalExpressionWithX.sObj.signs;
    let decimalExpressionWithNumbers = getNumbers(expression);
    let numbersDecimal = decimalExpressionWithNumbers.nObj.numbers;
    let signsOfNumbersDecimal = decimalExpressionWithNumbers.sObj.signs;

    signsOfXDecimal = turnNullToPlus(signsOfXDecimal);
    signsOfNumbersDecimal = turnNullToPlus(signsOfNumbersDecimal);

    let simplifiedDecimal = simplifyDecimals(sumUpXDecimals(signsOfXDecimal, coefsOfXDecimal, powersOfXDecimal)) + sumUpNumbersInDecimal(numbersDecimal, signsOfNumbersDecimal);
    let simplifiedFractional = simplifyFractions(getExpressionInFractions(simplifiedDecimal));

    return {
        "simplifiedDecimal": simplifiedDecimal.toString().replace(/^\+/, ''),
        "simplifiedFractional": simplifiedFractional.toString().replace(/^\+/, '')
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
                if (i == equalPowersPositions[k][l]) {notChecked = false;}
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

function sumUpSamePowersDecimals(signsOfXDecimal, coefsOfXDecimal, powersOfXDecimal) {
    let powersProcessor = getSamePowers(powersOfXDecimal);
    let samePowersPositions = powersProcessor.equalPowersPositions; // 2D array
    let powers = powersProcessor.equalPowers;

    let sumedUpCoef = 0;

    let simplified = '';
    for (let i = 0; i < samePowersPositions.length; i++) {
        for (let j = 0; j < samePowersPositions[i].length; j++) {
            if (signsOfXDecimal[samePowersPositions[i][j]] == '+') {
                sumedUpCoef += Number(coefsOfXDecimal[samePowersPositions[i][j]]);
            } else sumedUpCoef -= Number(coefsOfXDecimal[samePowersPositions[i][j]]);
        }

        if (sumedUpCoef != 0) {

            let coefWithSign = '';
            if (sumedUpCoef > 0) {
                if (sumedUpCoef == 1) {
                    coefWithSign = '+';
                } else coefWithSign = '+' + sumedUpCoef;
            }

            if (sumedUpCoef < 0) {
                if (sumedUpCoef == -1) {
                    coefWithSign = '-';
                } else coefWithSign = sumedUpCoef;
            } 

            if (powers[i] == 1) {
                simplified += coefWithSign + 'x';
            } else simplified += coefWithSign + 'x^' + powers[i];
        }

        sumedUpCoef = 0;
    }

    return {
        "simplified": simplified,
        "samePowersPositions" : samePowersPositions
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
            if (i == repetitiveCoefsPosition[j]) {notProcessed = false;}
        }
        if (notProcessed) {
            singleCoefsPosition[SC++] = i;
        }
    }
    return singleCoefsPosition;
}

function sumUpXDecimals(signsOfXDecimal, coefsOfXDecimal, powersOfXDecimal) {

    let sumUpSamePowersDecimalsObj = sumUpSamePowersDecimals(signsOfXDecimal, coefsOfXDecimal, powersOfXDecimal);
    let simplified = sumUpSamePowersDecimalsObj.simplified;
    let samePowersPositions = sumUpSamePowersDecimalsObj.samePowersPositions;

    let singleCoefsPosition = getSingleCoefPositions(samePowersPositions, coefsOfXDecimal);
    
    let positionNumber = '';
    for (let i = 0; i < singleCoefsPosition.length; i++) {
        positionNumber = singleCoefsPosition[i];
        if (powersOfXDecimal[positionNumber] == 1) {
            simplified += signsOfXDecimal[positionNumber] + Number(coefsOfXDecimal[positionNumber]) + 'x';
        } else {
            simplified += signsOfXDecimal[positionNumber] + Number(coefsOfXDecimal[positionNumber]) + 'x^' + powersOfXDecimal[positionNumber];
        }
    }

    return simplified;
}

function sumUpNumbersInDecimal(numbersDecimal, signsOfNumbersDecimal) {
    let simplifiedNumber = 0;
    let toReturn = '';
    for (let i = 0; i < numbersDecimal.length; i++) {
        if (signsOfNumbersDecimal[i] == '+') {
            simplifiedNumber += Number(numbersDecimal[i]);
        } else simplifiedNumber -= Number(numbersDecimal[i]);
    }

    if (simplifiedNumber > 0) {
        toReturn = '+' + simplifiedNumber;
    } else if (simplifiedNumber < 0) {
        toReturn += simplifiedNumber;
    }
    
    return toReturn;
}

function GCD(a, b) {
    let remainder;
    while (a > 0) {
        remainder = b%a;
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

    let amountOfZeros = 0;
    let firstZero = true;
    let begining = 0;
    let switched = true;
    let fixedNumerator;
    let fixedDenominator;
    for (let i = 0; i < numerators.length; i++) {
        for (let j = 0; j < numerators[i].toString().length && switched; j++) {
           
            if (amountOfZeros >= 7) {
                fixedNumerator = numerators[i].toString().substr(0, begining);
                fixedDenominator = denominators[i].toString().substr(0, begining);
                expression = expression.replace(numerators[i] + '/' + denominators[i], fixedNumerator + '/' + fixedDenominator);
                numerators[i] = fixedNumerator;
                denominators[i] = fixedDenominator;
                switched = false;
            }
            if (numerators[i].charAt(j) == '0') {
                if (firstZero) {begining = j; firstZero = false} else amountOfZeros++;
            }
        }

        let gcd = GCD(numerators[i], denominators[i]);
        fixedNumerator = Number(numerators[i]) / gcd;
        fixedDenominator = Number(denominators[i]) / gcd;
        expression = expression.replace(numerators[i] + '/' + denominators[i], fixedNumerator + '/' + fixedDenominator);
    }

    return expression;
}

function simplifyDecimals(expression) {

    const reg = /\d+\.(\d+)/g;

    let decimalPlaces = [];
    let DP = 0;

    let match;
    while ((match = reg.exec(expression)) != null) {
        decimalPlaces[DP++] = match[1];
    }

    let amountOfZeros = 0;
    let firstZero = true;
    let begining = 0;
    let switched = true;
    for (let i = 0; i < decimalPlaces.length; i++) {
        for (let j = 0; j < decimalPlaces[i].length && switched; j++) {
            
            if (amountOfZeros >= 7) {
                expression = expression.replace(decimalPlaces[i], decimalPlaces[i].toString().substr(0, begining));
                switched = false;
            }

            if (decimalPlaces[i].toString().charAt(j) == '0') {
                if (firstZero) {begining = j; firstZero = false;} else amountOfZeros++;
            } 
        }
    }

    return expression
}





function check(func) {
    for (let i = 0; i < functionDatabase.length; i++) {
        process.stdout.write(functionDatabase[i] + ' --> ');
        console.log(func(functionDatabase[i]));
    }
}