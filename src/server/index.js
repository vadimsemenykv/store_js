import app from './app';
import DB from './db';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host);
console.log(`Listening at http://localhost:${port}`);

process.on('SIGINT', function() {
    DB.close(function (err) {
        if (err) console.log('Unable to close Mongo connection.');
    })
});