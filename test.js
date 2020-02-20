const functionDatabase = [
    "x^4 - 14",
    "x^3 + 10",
    "x^4 - 12",
    "x + 9 - x",
    "x^3 + 10",
    "x^4 - 8 - x^4",
    "x^2 - 16 - x^2",
    "x - 14",
    "x - 3",
    "x + 6",
    "x - 4 + x",
    "x^2 - 6 - x^2",
    "x^3 - 9",
    "x^4 - 17 - x^4",
    "x^3 - 15 - x^3",
    "x - 18 - x",
    "x - 5 - x",
    "x^2 - 7 - x^2",
    "x - 15",
    "x - 18",
    "x^4 + 12 - x^4",
    "x^2 - 15 - x^2",
    "x - 14 + x",
    "x^2 - 15 - x^2",
    "x^4 - 6",
    "x - 9 - x",
    "x^3 - 8",
    "x^4 - 6 - x^4",
    "x^4 - 15",
    "x^3 - 2 - x^3",
    "x - 12",
    "x^2 + 12",
    "x^3 - 4 - x^3",
    "x^2 - 1",
    "x^4 - 9 - x^4",
    "x + 5 - x",
    "x - 3 + x",
    "x^3 - 11 - x^3",
    "x^4 - 13 - x^4",
    "x^2 - 11 - x^2",
    "x^3 - 4",
    "x^2 - 3 + x^2",
    "x^4 - 19",
    "x^3 - 16",
    "x^2 - 13",
    "x^4 - 11",
    "x^2 - 14",
    "x^2 + 5",
    "x^3 - 19 + x^3",
    "x^3 - 8",
    "x^2 - 19 - x^2",
    "x^3 - 12 - x^3",
    "x - 14",
    "x^3 - 4",
    "x - 12",
    "x^2 - 8",
    "x^2 - 3",
    "x^2 - 1 - x^2",
    "x^2 - 15 - x^2",
    "x^3 + 7 - x^3",
    "x^3 - 17",
    "x^2 - 16",
    "x^2 + 13 - x^2",
    "x^3 - 14",
    "x^3 + 14 - x^3",
    "x^3 - 9",
    "x^3 + 16 - x^3",
    "x^3 - 4 - x^3",
    "x^2 - 10",
    "x - 2 - x",
    "x - 17 - x",
    "x^2 - 10 + x^2",
    "x - 3",
    "x^3 + 14 + x^3",
    "x^3 - 7",
    "x^3 - 18 - x^3",
    "x^3 - 8 - x^3",
    "x^2 - 11",
    "x^4 + 6 - x^4",
    "x^4 - 4 - x^4",
    "x - 14 - x",
    "x^3 + 7",
    "x^4 - 10",
    "x^2 + 13 - x^2",
    "x - 18",
    "x^3 - 18 - x^3",
    "x^3 - 2 - x^3",
    "x^4 + 10 - x^4",
    "x^4 - 16",
    "x^4 - 13 - x^4",
    "x^4 - 9 - x^4",
    "x^3 + 14",
    "x^2 - 4 - x^2",
    "x^3 - 3 + x^3",
    "x^3 + 14",
    "x - 8 - x",
    "x^4 + 11 - x^4",
    "x^3 - 18",
    "x^3 + 15 - x^3",
    "x^4 - 9",
    "x^2 - 15 - x^2",
    "x^4 - 5",
    "x^2 + 18 - x^2",
    "x^4 - 12 - x^4",
    "x^4 + 7 - x^4",
    "x^3 - 11",
    "x^2 - 16",
    "x^3 - 5 - x^3",
    "x^2 + 19",
    "x^3 - 11",
    "x - 10",
    "x^2 + 12",
    "x^3 - 9 - x^3",
    "x^3 + 3 - x^3",
    "x - 17 - x",
    "x^3 - 14",
    "x^2 + 15 + x^2",
    "x^3 - 7 - x^3",
    "x^2 - 7 - x^2",
    "x^4 + 6 - x^4",
    "x - 14",
    "x^3 - 9 + x^3",
    "x^2 - 7 - x^2",
    "x^4 - 5",
    "x^3 - 17",
    "x - 4",
    "x^4 - 14 - x^4",
    "x + 3 - x",
    "x^3 + 18 - x^3",
    "x^4 + 4 - x^4",
    "x^2 - 13",
    "x^2 - 13 - x^2",
    "x^3 - 12 - x^3",
    "x^4 - 18 - x^4",
    "x^2 - 12",
    "x^2 - 19 - x^2",
    "x^3 - 14",
    "x^2 - 13",
    "x^3 - 21",
    "x^4 - 6",
    "x^2 + 14 - x^2",
    "x^3 - 6 - x^3",
    "x^2 - 4",
    "x^2 - 4",
    "x^4 - 18 - x^4",
    "x^2 - 3",
    "x^2 - 7 - x^2",
    "x^2 - 1",
    "x + 6",
    "x^4 - 13",
    "x^2 - 13",
    "x^3 + 18",
    "x^3 - 2 - x^3",
    "x^2 - 1",
    "x - 5",
    "x^2 + 13",
    "x^2 - 7",
    "x^3 - 4",
    "x^2 - 13 - x^2",
    "x^4 - 12 - x^4",
    "x^3 - 9 + x^3",
    "x^2 + 10",
    "x^2 - 19",
    "x^2 + 4",
    "x^2 - 6",
    "x^3 - 21",
    "x^2 - 11",
    "x - 3",
    "x - 15 - x",
    "x - 18 - x",
    "x^4 - 8 + x^4",
    "x^2 + 4 - x^2",
    "x^2 - 3 - x^2",
    "x^3 - 4 - x^3",
    "x^3 - 10",
    "x^2 - 3 - x^2",
    "x - 1 - x",
    "x - 12",
    "x^4 - 5",
    "x^4 - 14 - x^4",
    "x^4 - 15",
    "x^4 - 7",
    "x^2 - 8 - x^2",
    "x + 11 - x",
    "x^3 + 21",
    "x^4 - 16",
    "x^2 - 9 - x^2",
    "x^2 + 9 - x^2",
    "x - 4 - x",
    "x - 3 - x",
    "x^4 + 12 + x^4",
    "x^3 + 14 - x^3",
    "x^3 - 21 + x^3",
    "x^3 - 12 - x^3",
    "x^2 - 20",
    "x^3 + 6 - x^3",
    "x^4 - 2",
    "x^2 - 17 - x^2",
    "x^2 - 5 - x^2",
    "x^2 - 10"
  ];

  function getPolynomialWithX(expression) {

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


  let numbersInExpression = expression.replace(
    extractXReg, 
    ''
    );


    let sObj = {signs: [], s: 0};
    let nObj = {numbers: [], n: 0};

    let match;

    while ((match = extractNumberReg.exec(numbersInExpression)) != null) {

      if (match[1] == null) {
        sObj.signs[sObj.s++] = '';
      } else sObj.signs[sObj.s++] = match[1];

      nObj.numbers[nObj.n++] = match[2];
    }

    return {"sObj": sObj, "nObj": nObj};
}



// ------------------------------------------------------------------- //



function simplify(expression) { 

    let xExtractor = getPolynomialWithX(expression);
    let coefsOfX = xExtractor.cObj.coef;
    let powersOfX = xExtractor.pObj.powers;
    let signsOfX = xExtractor.sObj.signs;

    let numberExtractor = getNumbers(expression);
    let numbers = numberExtractor.nObj.numbers;
    let signsOfNumbers = numberExtractor.sObj.signs; // passes no sign as ''
  
    signsOfX = turnNullToPlus(signsOfX);
    signsOfNumbers = turnNullToPlus(signsOfNumbers);

    let simplifiedX = sumUpX(signsOfX, coefsOfX, powersOfX);
    let simplifiedNumber = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (signsOfNumbers[i] == '+') {
            simplifiedNumber += Number(numbers[i]);
        } else simplifiedNumber -= Number(numbers[i]);
    }

    let simplification = simplifiedX;

    if (simplifiedNumber > 0) {
        simplification += '+' + simplifiedNumber;
    } else if (simplifiedNumber < 0) {
        simplification += simplifiedNumber;
    }

    return simplification.replace(/^\+/, '');
}
  
  function turnNullToPlus(signs) {
    for (let i = 0; i < signs.length; i++) {
      if (signs[i] == '') signs[i] = '+';
    }
    return signs;
  }
  
  function theSamePower(pow1, pow2) {
    if (pow1 == pow2) return true;
    else return false;
  } 

  function getSamePowers(powersOfX) {

    let equalPowersPositions = [];
    let EPP = 0;
    let equalPowers = [];
    let EP = 0;

    for (let i = 0; i < powersOfX.length; i++) {

        let notChecked = true;
        for (let k = 0; k < equalPowersPositions.length; k++) {
            for (let l = 0; l < equalPowersPositions[k].length; l++) {
                if (i == equalPowersPositions[k][l]) {
                    notChecked = false;
                    break;
                }
                
            }
        }
        
        let haveTheSamePowers = false;
        let powersCollector = [];
        let PC = 1;
        if (notChecked) {
            for (let j = i + 1; j < powersOfX.length; j++) {
                if (theSamePower(powersOfX[i], powersOfX[j])) {
                    powersCollector[PC++] = j;
                    haveTheSamePowers = true;
                }
            }
            if (haveTheSamePowers) {
                powersCollector[0] = i;
                equalPowersPositions[EPP++] = powersCollector;
            }
        }
        equalPowers[EP++] = powersOfX[i];
    }

    return {
        "equalPowersPositions": equalPowersPositions, // returns 2D array
        "equalPowers": equalPowers
    }; 
}

function sumUpX(signsOfX, coefsOfX, powersOfX) {

    let powersProcessor = getSamePowers(powersOfX);
    let samePowersPositions = powersProcessor.equalPowersPositions; // 2D array
    let powers = powersProcessor.equalPowers;

    let sumedUpCoef = 0;

    let simplified = '';

    for (let i = 0; i < samePowersPositions.length; i++) {
        for (let j = 0; j < samePowersPositions[i].length; j++) {
            if (signsOfX[samePowersPositions[i][j]] == '+') {
                sumedUpCoef += Number(coefsOfX[samePowersPositions[i][j]]);
            } else sumedUpCoef -= Number(coefsOfX[samePowersPositions[i][j]]);
        }

        let sumedUpCoefIsZero = false;
        if (sumedUpCoef == 0) sumedUpCoefIsZero = true;

        if (!sumedUpCoefIsZero) {
            let coefWithSign = '';
            
            if (sumedUpCoef > 0) {
                if (sumedUpCoef == 1) {
                    coefWithSign = '+';
                } else coefWithSign = '+' + sumedUpCoef;
            } else if (sumedUpCoef == -1) {
                coefWithSign = '-';
            } else coefWithSign = sumedUpCoef

            if (powers[i] == 1) {
                simplified += coefWithSign + 'x';
            } else simplified += coefWithSign + 'x^' + powers[i];
        }
        
        sumedUpCoef = 0;
    }

    let repetitiveCoefsPosition = [];
    let RC = 0;
    for (let i = 0; i < samePowersPositions.length; i++) {
        for (let j = 0; j < samePowersPositions[i].length; j++) {
            repetitiveCoefsPosition[RC++] = samePowersPositions[i][j];
        }
    }


    let singleCoefsPosition = [];
    let SC = 0;
    for (let i = 0; i < coefsOfX.length; i++) {
        let notProcessed = true;
        for (let j = 0; j < repetitiveCoefsPosition.length; j++) {
            if (i == repetitiveCoefsPosition[j]) {
                notProcessed = false;
                break;
            }
        }
        if (notProcessed) {
            singleCoefsPosition[SC++] = i;
        }
    }
    let positionNumber = '';
    for (let i = 0; i < singleCoefsPosition.length; i++) {
        positionNumber = singleCoefsPosition[i];
        if(coefsOfX[positionNumber] == 1) {
            coefsOfX[positionNumber] = '';
        }
        if (powersOfX[positionNumber] == 1) {
            simplified += signsOfX[positionNumber] + coefsOfX[positionNumber] + 'x';
        } else simplified += signsOfX[positionNumber] + coefsOfX[positionNumber] + 'x^' + powers[positionNumber];
    }

    return simplified;
}
const extractXReg = /\s*([\+|-]*)\s*(\d+\.\d+|\d+)*x\^*(\d+)*\s*/g;
const extractNumberReg = /\s*([\+|-]*)\s*(\d+\.\d+|\d+)\s*/g;

  function simplificationOfArray(functionDatabase) {
      for (let i = 0; i < functionDatabase.length; i++) {
          console.log(simplify(functionDatabase[i]));
      }
  }

  simplificationOfArray(functionDatabase);