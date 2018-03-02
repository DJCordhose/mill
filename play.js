function isMoveValid(compressedState, game) {
    const possibleNextStates = expandState(compressedState, game)
}

function expandState(compressedState, phase, maxPlayer) {
    const nextStates = [];
    if (phase === 'Set') {
        const arr = [...compressedState];
        arr.forEach((state, idx) => {
            if (state === 'o') {
                const nextArr = arr.slice();
                nextArr[idx] = maxPlayer ? blackSymbol : whiteSymbol;
                const newState = nextArr.join('');
                nextStates.push(newState);
            }
        });


    } else if (phase === 'Moving') {

    }
    // return [nextStates[0], nextStates[1]];
    return nextStates;
}

// https://en.wikipedia.org/wiki/Minimax
// https://en.wikipedia.org/wiki/Negamax
// black pos, white neg
function minimax(state, depth, phase, maxPlayer) {
    if (depth === 0) {
        return {
            value: evaluate(state),
            state: state
        }
    }
    if (maxPlayer) {
        let bestValue = - Number.MAX_VALUE;
        let bestState = null;
        const children = expandState(state, phase, maxPlayer);
        children.forEach(child => {
            const value = minimax(child, depth - 1, phase, !maxPlayer).value;
            if (value > bestValue) {
                bestValue = value;
                bestState = child;
            }
        });
        return {
            value: bestValue,
            state: bestState
        };
    } else {
        let bestValue = Number.MAX_VALUE;
        let bestState = null;
        const children = expandState(state, phase, maxPlayer);
        children.forEach(child => {
            const value = minimax(child, depth - 1, phase, !maxPlayer).value;
            if (value < bestValue) {
                bestValue = value;
                bestState = child;
            }
        });
        return {
            value: bestValue,
            state: bestState
        };
    
    }
}