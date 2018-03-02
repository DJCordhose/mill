function evaluate(data, game) {
    let scoreWhite = 0;
    let scoreBlack = 0;

    data.forEach((field, idx) => {
        const value = values[idx];
        if (field.state === whiteSymbol) {
            scoreWhite += value;
        } else if (field.state === blackSymbol) {
            scoreBlack += value;
        }
    });

    return scoreBlack - scoreWhite;
}