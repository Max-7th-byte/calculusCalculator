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

  module.exports.randomFunctionArray = randomFunctionArray;
  