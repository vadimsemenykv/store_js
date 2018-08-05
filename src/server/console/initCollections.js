import DB from '../db';
import Collection from '../dao/Collection';
import Currency from '../dao/Currency';
import Counter from '../dao/Counter';

const mongoDbUrl = process.env.MONGO_DB_URL;

DB.connect(mongoDbUrl, function (err) {
    if (err) {
        console.log(`Unable to connect to Mongo to ${mongoDbUrl}.`);
        console.log(err);
        process.exit(1);
    }
});

// Currency.create({
//     title: 'USD'
// }).catch(err => {
//     console.error(err.toString());
// }).then(col => {
//     console.log('Success');
// });
// Currency.create({
//     title: 'CAD'
// }).catch(err => {
//     console.error(err.toString());
// }).then(col => {
//     console.log('Success');
// });
//
// Collection.create({
//     title: 'Corn'
// }).catch(err => {
//     console.error(err.toString());
// }).then(col => {
//     console.log('Success');
// });
//
// Collection.create({
//     title: 'Maize'
// }).catch(err => {
//     console.error(err.toString());
// }).then(col => {
//     console.log('Success');
// });

Counter.create({
    _id: 'orderId'
}).catch(err => {
    console.error(err.toString());
}).then(col => {
    console.log('Success');
});

DB.close();
// process.exit();
