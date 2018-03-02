function isMoveValid(compressedState, game) {
    const possibleNextStates = expandState(compressedState, game)    
}

function expandState(compressedState, game) {
    const nextStates = [];
    if (game.phase === 'Set') {
        const arr = [... compressedState];
        arr.forEach((state, idx) => {
            if (state === 'o') {
                const nextArr = arr.slice();
                nextArr[idx] = game.player;
                const newState = nextArr.join('');
                nextStates.push(newState);
            }
        });
        
        
    } else if (game.phase === 'Moving') {

    }
    return nextStates;
}

function computerMove(compressedState, game) {
    const states = expandState(compressedState, game);
    const evaluations = states.map(state => evaluate(state, game));
    let max = - Number.MAX_VALUE;
    let maxState = null;
    evaluations.forEach((evaluation, idx) => {
        if (evaluation > max) {
            max = evaluation;
            maxState = states[idx];
        }
    });
    game.player = whiteSymbol;
    return maxState;
}