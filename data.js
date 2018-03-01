let compressedState = "oooooooooooooooooooooooo";
const ids = ['f11', 'f14', 'f17', 'f22', 'f24', 'f26', 'f33', 'f34', 'f35', 'f41', 'f42', 'f43', 'f45', 'f46', 'f47', 'f53', 'f54', 'f55', 'f62', 'f64', 'f66', 'f71', 'f74', 'f77'];

const game = {
    player: 'W',
    phase: 'Set',
    bPiecesLost: 0,
    bPiecesSettable: 9,
    wPiecesLost: 0,
    wPiecesSettable: 9
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
    const arr = [... compressedState];
    arr[idx] = state;
    const newState = arr.join('');
    compressedState = newState;
}

