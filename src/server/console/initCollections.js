import Collection from "../dao/Collection";
import DB from "../db";
import {urlFor} from "express-named-router-url-generator";
import Currency from "../dao/Currency";

const mongo_db_url = process.env.MONGO_DB_URL;

DB.connect(mongo_db_url, function (err) {
    if (err) {
        console.log(`Unable to connect to Mongo to ${mongo_db_url}.`);
        console.log(err);
        process.exit(1)
    }
});

Currency.create({
    title: "USD"
}).catch(err => {
    console.error(err.toString())
}).then(col => {
    console.log('Success')
});
Currency.create({
    title: "CAD"
}).catch(err => {
    console.error(err.toString())
}).then(col => {
    console.log('Success')
});

Collection.create({
    title: "Corn"
}).catch(err => {
    console.error(err.toString())
}).then(col => {
    console.log('Success')
});

Collection.create({
    title: "Maize"
}).catch(err => {
    console.error(err.toString())
}).then(col => {
    console.log('Success')
});

DB.close();
// process.exit();