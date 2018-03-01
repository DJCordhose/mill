function createBoard(data) {
    const fields = {};
    data.forEach(d => fields[d.id] = `<span class='field' id='${d.id}'>${d.state}</span>`)

    const board =
        `${fields.f11}-----------${fields.f14}-----------${fields.f17}
|           |           |
|  ${fields.f22}--------${fields.f24}--------${fields.f26}  |
|  |        |        |  |
|  |  ${fields.f33}-----${fields.f34}-----${fields.f35}  |  |
|  |  |           |  |  |
${fields.f41}--${fields.f42}--${fields.f43}           ${fields.f45}--${fields.f46}--${fields.f47}
|  |  |           |  |  |
|  |  ${fields.f53}-----${fields.f54}-----${fields.f55}  |  |
|  |        |        |  |
|  ${fields.f62}--------${fields.f64}--------${fields.f66}  |
|           |           |
${fields.f71}-----------${fields.f74}-----------${fields.f77}`;
    return board;
}

function handleClick(id, data, game) {
    if (game.phase == "Set") {
        const field = getFieldForId(data, id);

        if (field.state == "o") {
            setState(id, game.player);

            if (game.player == 'B') {
                game.bPiecesSettable--;

                if (game.bPiecesSettable == 0) {
                    game.phase = 'Moving'
                }

                game.player = whiteSymbol;
            } else {
                game.wPiecesSettable--;
                game.player = blackSymbol;
            }

            displayBoard(getData(), game);
        }
    } else {

    }
}

function displayBoard(data, game) {
    const board = createBoard(data);
    document.getElementById('board').innerHTML = board;
    document.getElementById('eval').innerHTML = evaluate(data, game);
    document.getElementById('phase').innerHTML = game.phase;
    document.getElementById('player').innerHTML = game.player;
    document.getElementById('bsettable').innerHTML = game.bPiecesSettable;
    document.getElementById('blost').innerHTML = game.bPiecesLost;
    document.getElementById('wsettable').innerHTML = game.wPiecesSettable;
    document.getElementById('wlost').innerHTML = game.wPiecesLost;
    
    const fields = document.querySelectorAll('span.field');
    fields.forEach(field => field.addEventListener('click', e => {
        handleClick(e.target.id, data, game);
    }));
}

function getFieldForId(data, id) {
    return data.filter(function(dataa) {
        return dataa.id == id;
    })[0];
}