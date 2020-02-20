
let stack = [];
let S = 0;
let Export = {

    push: function(x) {
        stack[S++] = x;
    },

    pop: function() {

        if (S == 0) {
            console.log("ERROR: EMPTY STACK");
        } else {
            let temp = stack[S - 1];
            stack.splice(S - 1, 1);
        return temp;
        }
    },

    print: function() {
        for (let i = 0; i < S; i++) {
            console.log(stack[i]);
        }
    }
}

