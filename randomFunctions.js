const extractXReg = /\s*([\+|-]*)\s*(\d+\.\d+|\d+)*x\^*(\d+)*\s*/g;
const extractNumberReg = /\s*([\+|-]*)\s*(\d+\.\d+|\d+)\s*/g;

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
              equalPowers[EP++] = powersOfX[i];
          }
      }
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
      } else simplified += signsOfX[positionNumber] + coefsOfX[positionNumber] + 'x^' + powersOfX[positionNumber];
  }

  return simplified;
}

function randomFunction() {

    var finalFunction = '';
  
    const amountOfXsToThePower = Math.ceil(Math.random()*5);
    const amountOfNumbers = Math.ceil(Math.random()*2);
    
  
    var poweredXs = [];
    var power = '';
    for (let i = 0; i < amountOfXsToThePower; i++) {
      power  = Number(1 + Math.random()*4).toFixed(0);
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
    if (signChooser == 0) signForNumber = '+';
    else signForNumber = '-';
    var unit;
    for (let i = 0; i < min; i++) {
      unit = signForX + poweredXs[i] + signForNumber + numbers[i];
      finalFunction += unit;
      signChooser = Number(Math.random() * 2).toFixed(0);
      if (signChooser == 0) signForX = '+';
      else signForX = '-';
    }
  
    for (let i = 0; i < max - min; i++) {
      signChooser = Number(Math.random() * 2).toFixed(0);
      if (signChooser == 0) signForX = '+';
      else signForX = '-';
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


  function cleanRandomFunctionArray() {
    let toReturn = [];
    let TR = 0;
    let array = randomFunctionArray();
    for (let i = 0; i < array.length; i++) {
      array[i] = simplify(array[i]);
      if (array[i].includes('x') && array[i].length > 10) {
        toReturn[TR++] = array[i];
      }
    }
  
    return toReturn;
  }

