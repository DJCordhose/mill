const fields = document.querySelectorAll('span.field');
fields.forEach(field => field.addEventListener('click', e => {
    const fieldd = getFieldForId(e.target.id);
    if (isSetAllowed(fieldd)) {
        fieldd.state = game.player;
        document.getElementById('board').innerHTML =  createBoard(data);
    }
}));

function getFieldForId(id) {
    return data.filter(function(dataa) {
        return dataa.id == id;
    })[0];
}

function isSetAllowed(field) {
    if (field.state == "o") {
        return true;
    }
}