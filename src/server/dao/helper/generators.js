export function randomAlphabetical(max) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < max; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
