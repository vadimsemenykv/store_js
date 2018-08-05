export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function idFormatter(id, size = 12) {
    let s = id + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}
