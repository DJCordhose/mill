function isMoveValid(state, game) {
    const possibleNextStates = expandState(state, game)    
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
