const whiteSymbol = 'W';
const blackSymbol = 'B';
const emptySymbol = 'o';

const phaseSet = 'Set';
const phaseMoving = 'Moving';

let compressedState = "oooooooooooooooooooooooo";
const ids = ['f11', 'f14', 'f17', 'f22', 'f24', 'f26', 'f33', 'f34', 'f35', 'f41', 'f42', 'f43', 'f45', 'f46', 'f47', 'f53', 'f54', 'f55', 'f62', 'f64', 'f66', 'f71', 'f74', 'f77'];
const values = [
    2, 3, 2,
    2, 4, 2,
    2, 3, 2,
    3, 4, 3, 3, 4, 3,
    2, 3, 2,
    2, 4, 2,
    2, 3, 2,
];

const mills = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11], [12, 13, 14],
    [15, 16, 17],
    [18, 19, 20],
    [21, 22, 23],

    // vertical

    [0, 9, 18],
    [3, 10, 15],
    [6, 11, 15],
    [1, 4, 7], [16, 19, 22],
    [8, 12, 17],
    [5, 13, 20],
    [2, 14, 23]
];

const game = {
    player: whiteSymbol,
    phase: phaseSet,
    bPiecesLost: 0,
    bPiecesSettable: 9,
    wPiecesLost: 0,
    wPiecesSettable: 9,
    movingSelect: ""
};

function getData() {
    const data = ids.map((id, idx) => ({
        id,
        state: compressedState[idx]
    }));
    return data;
}

function idx4Id(id) {
    for (let idx = 0; idx < ids.length; idx++) {
        const id4Idx = ids[idx];
        if (id === id4Idx) {
            return idx;
        }
    }
    return -1;
}

function setState(id, state) {
    const idx = idx4Id(id);
    const arr = [...compressedState];
    arr[idx] = state;
    const newState = arr.join('');
    compressedState = newState;
}