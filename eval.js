const whiteSymbol = 'W';
const blackSymbol = 'B';

function evaluate(data, game) {
    let scoreWhite = 0;
    let scoreBlack = 0;

    const whiteOnBoard = data.reduce(0, field => field.state === whiteSymbol ? 1 : 0);
    const blackOnBoard = data.reduce(0, field => field.state === blackSymbol ? 1 : 0);

    return scoreBlack - scoreWhite;
}