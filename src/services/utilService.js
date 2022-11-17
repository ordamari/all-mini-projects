export const utilService = {
    genId,
    addZeroIfNeed
}


function genId() {
    return "id" + Math.random().toString(16).slice(2);
}

function addZeroIfNeed(number) {
    return number < 10 ? '0' + number : '' + number;
}