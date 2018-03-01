const whiteSymbol = 'W';
const blackSymbol = 'B';

function evaluate(data, game) {
    let scoreWhite = 0;
    let scoreBlack = 0;

    const whiteOnBoard = data.filter(field => field.state === whiteSymbol).length;
    const blackOnBoard = data.filter(field => field.state === blackSymbol).length;

    scoreWhite += whiteOnBoard;
    scoreBlack += blackOnBoard;

    return scoreBlack - scoreWhite;
}