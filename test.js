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
        if (numertor == null) numertor = 1;
            expression = expression.replace(
                '(' + numertor + 'x/' + denominator + ')^' + power,
                Math.pow(numertor, power) + '/' + Math.pow(denominator, power) + 'x^' + power
            );
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

console.log(xOverNumber('12-(2x/3)^2-5x/6-(4x/5)^3 + 15 - 3/6x^22'));