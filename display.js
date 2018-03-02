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
    if (game.phase === "Set") {
        const field = getFieldForId(data, id);

        if (field.state == "o") {
            setState(id, game.player);

            if (detectMill(id, game.player, data, game)) {
                if (game.player == "B") {
                    game.bPiecesSettable--;
    
                    if (game.bPiecesSettable == 0) {
                        game.phase = "Moving Mill";
                    } else {
                        game.phase = "Set Mill";
                    }
                } else {
                    game.wPiecesSettable--;

                    game.phase = "Set Mill";
                }
            } else {
                if (game.player == "B") {
                    game.bPiecesSettable--;
    
                    if (game.bPiecesSettable == 0) {
                        game.phase = "Moving";
                    }
    
                    game.player = whiteSymbol;
                } else {
                    game.wPiecesSettable--;
                    game.player = blackSymbol;
                }
            }

            displayBoard(getData(), game);
        }
    } else if (game.phase === "Set Mill") {
        if (!detectMill(id, (game.player === "W" ? "B" : "W"), data, game) & getData()[idx4Id(id)].state != "o" & getData()[idx4Id(id)].state != game.player) {
            setState(id, "o");

            if (game.player == "B") {
                game.wPiecesLost++;
                game.player = whiteSymbol;
            } else {
                game.bPiecesLost++;
                game.player = blackSymbol;
            }

            game.phase = "Set";

            displayBoard(getData(), game);
        }
    } else if (game.phase === "Moving Mill") {
        if (!detectMill(id, (game.player === "W" ? "B" : "W"), data, game) & getData()[idx4Id(id)].state != "o" & getData()[idx4Id(id)].state != game.player) {
            setState(id, "o");

            if (game.player == "B") {
                game.wPiecesLost++;
                game.player = whiteSymbol;
            } else {
                game.bPiecesLost++;
                game.player = blackSymbol;
            }

            game.phase = "Moving";

            displayBoard(getData(), game);
            compressedState = computerMove(compressedState, game);
            displayBoard(getData(), game);
        }
    } else if (game.phase === "Moving") {
        if (getData()[idx4Id(id)].state == game.player) {
            game.movingSelect = id;

            game.phase = "Moving Select";

            displayBoard(getData(), game);

            document.getElementById(id).style = "color: grey";
        }
    } else if (game.phase === "Moving Select") {
        if (getData()[idx4Id(id)].state === "o") {
            mSX = game.movingSelect.charAt(2);
            mSY = game.movingSelect.charAt(1);
            idX = id.charAt(2);
            idY = id.charAt(1);
            
            var valid = false;

            if ((idY === mSY) & ((idY != 4 & Math.abs(idx4Id(id) - idx4Id(game.movingSelect)) == 1) | (((idX <= 3 & mSX <= 3) | (idX >= 5 & mSX >= 5)) & Math.abs(idx4Id(id) - idx4Id(game.movingSelect)) == 1))) valid = true;

            if (idX === mSX) {
                hLine = [];

                getData().forEach(function(d) {
                    dIdX = d.id.charAt(2);
                    dIdY = d.id.charAt(1);

                    if (mSX != "4" & dIdX === mSX) {
                        hLine.push(d);
                    } else if (((mSY <= 3 & dIdY <= 3) | (mSY >= 5 & dIdY >= 5)) & dIdX === mSX) {
                        hLine.push(d);
                    }
                });

                if (Math.max(hLine.map(function(e) { return e.id; }).indexOf(id), hLine.map(function(e) { return e.id; }).indexOf(game.movingSelect)) - (Math.min(hLine.map(function(e) { return e.id; }).indexOf(id), hLine.map(function(e) { return e.id; }).indexOf(game.movingSelect)) == -1 ? 999 : Math.min(hLine.map(function(e) { return e.id; }).indexOf(id), hLine.map(function(e) { return e.id; }).indexOf(game.movingSelect))) == 1) valid = true;
            }

            if (valid) {
                game.phase = "Moving";
                setState(id, game.player);
                setState(game.movingSelect, "o");
                game.player = (game.player === "W" ? "B" : "W");

                displayBoard(getData(), game);
            }
        } else if (id === game.movingSelect) {
            game.phase = "Moving";
            displayBoard(getData(), game);
        }
    }
}

function detectMill(id, player, data, game) {
    fieldData = getData();
    hMill = [fieldData[idx4Id(id)]];
    vMill = [fieldData[idx4Id(id)]];

    getData().forEach(function(d) {
        dIdX = d.id.charAt(2);
        dIdY = d.id.charAt(1);
        idX = id.charAt(2);
        idY = id.charAt(1);

        if (dIdY != "4") {
            if (idY == dIdY & id != d.id & d.state === player) {
                hMill.push(d);
            }
        } else {
            if (idX <= 3) {
                if (idY == dIdY & id != d.id & dIdX <= 3 & d.state === player) {
                    hMill.push(d);
                }
            } else {
                if (idY == dIdY & id != d.id & dIdX >= 5 & d.state === player) {
                    hMill.push(d);
                }
            }
        }

        if (dIdX != "4") {
            if (idX == dIdX & id != d.id & d.state === player) {
                vMill.push(d);
            }
        } else {
            if (idY <= 3) {
                if (idX == dIdX & id != d.id & dIdY <= 3 & d.state === player) {
                    vMill.push(d);
                }
            } else {
                if (idX == dIdX & id != d.id & dIdY >= 5 & d.state === player) {
                    vMill.push(d);
                }
            }
        }
    });

    if (hMill.length === 3 | vMill.length === 3) {
        return true;
    }

    return false;
}

function displayBoard(data, game) {
    const board = createBoard(data);
    document.getElementById('board').innerHTML = board;
    document.getElementById('player').innerHTML = game.player;
    document.getElementById('phase').innerHTML = game.phase;
    document.getElementById('bsettable').innerHTML = game.bPiecesSettable;
    document.getElementById('blost').innerHTML = game.bPiecesLost;
    document.getElementById('wsettable').innerHTML = game.wPiecesSettable;
    document.getElementById('wlost').innerHTML = game.wPiecesLost;

    const eval = evaluate(data, game)
    document.getElementById('eval').innerHTML = (eval > 0 ? eval + " for <b>B</b>" : (eval < 0 ? eval*-1 + " for <b>W</b>" : "<b>Draw</b>"));
    
    const fields = document.querySelectorAll('span.field');
    fields.forEach(field => field.addEventListener('click', e => {
        handleClick(e.target.id, data, game);
    }));
}

function getFieldForId(data, id) {
    return data.filter(function(d) {
        return d.id == id;
    })[0];
}