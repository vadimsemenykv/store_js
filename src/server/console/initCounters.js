/* eslint-disable no-console,no-unused-vars */
import DB from '../db';
import Counter from '../dao/Counter';

const mongoDbUrl = process.env.MONGO_DB_URL;

DB.connect(mongoDbUrl, function (err) {
    if (err) {
        console.log(`Unable to connect to Mongo to ${mongoDbUrl}.`);
        console.log(err);
        process.exit(1);
    }
});

Counter.create({
    _id: 'orderId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('Order seq - Success');
});

Counter.create({
    _id: 'offerId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('Offer seq - Success');
});

Counter.create({
    _id: 'contractId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('Contract seq - Success');
});

Counter.create({
    _id: 'userId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('User seq - Success');
});

Counter.create({
    _id: 'collectionId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('Collection seq - Success');
});

Counter.create({
    _id: 'currencyId'
}).catch((err) => {
    console.error(err.toString());
}).then((counter) => {
    console.log('Currency seq - Success');
});

DB.close();
// process.exit();
