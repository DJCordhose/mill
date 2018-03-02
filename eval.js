// black pos, white neg
function evaluate(compressedState) {
    let scoreWhite = 0;
    let scoreBlack = 0;

    [... compressedState].forEach((state, idx) => {
        const value = values[idx];
        if (state === whiteSymbol) {
            scoreWhite += value;
        } else if (state === blackSymbol) {
            scoreBlack += value;
        }
    });

    return scoreBlack - scoreWhite;
}

