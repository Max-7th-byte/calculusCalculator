function xOverNumber(expression) {

    const regXOverNumberWithPower = /\((\d+)*x\/(\d+)\)\^(\d+)/g;

    let match;
    let numertor = 0;
    let denominator = 0;
    let power = 0;
    while ((match = regXOverNumberWithPower.exec(expression)) != null) {
        numertor = match[1];
        denominator = match[2];
        power = match[3];
        console.log(numertor + "|" + denominator + "|" + power);
        if (numertor == null) numertor = 1;
        expression = expression.replace(regXOverNumberWithPower, Math.pow(numertor, power) + '/' + Math.pow(denominator, power) + 'x^' + power);
    }

    const regXOverNumberWithoutPower = /(\d*)x\/(\d+)/g;


    while ((match = regXOverNumberWithoutPower.exec(expression)) != null) {
        numertor = match[1];
        if (numertor == null) numertor = 1;
        denominator = match[2];
        expression = expression.replace(regXOverNumberWithoutPower, numertor + '/' + denominator + 'x');
    }

    return expression;
}

console.log(xOverNumber('(2x/3)^4+5x/6+(4x/5)^2'));