const millScore = 12;

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

    const {
        whiteMills,
        blackMills
    } = countMills(compressedState);

    scoreBlack += blackMills * millScore;  
    scoreWhite += whiteMills * millScore;  

    return scoreBlack - scoreWhite;
}

function countMills(compressedState) {
    let whiteMills = 0;
    let blackMills = 0;

    mills.forEach(mill => {
        const m0 = compressedState[mill[0]];
        const m1 = compressedState[mill[1]];
        const m2 = compressedState[mill[2]];
        
        if (m0 !== emptySymbol && m0 === m1 && m1 === m2) {
            if (m0 === blackSymbol) {
                blackMills++;
            } else {
                whiteMills++;
            }
        }
    });
    return {
        whiteMills,
        blackMills
    };
}