function getFieldForId(id) {
    return data.filter(function(dataa) {
        return dataa.id == id;
    })[0];
}

function isSetAllowed(field) {
    return field.state == "o";
}