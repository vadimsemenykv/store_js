import Mongo from 'mongodb';

let MongoClient = Mongo.MongoClient;

let state = {
    db: null,
};

class DB {}

DB.state = {
    db: null,
};

DB.connect = (url, done) => {
    if (DB.state.db) return done();

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err);
        DB.state.db = db;
        done()
    })
};

DB.get = () => {return DB.state.db};

DB.close = (done) => {
    if (DB.state.db) {
        DB.state.db.close(function(err, result) {
            DB.state.db = null;
            DB.state.mode = null;
            done(err)
        })
    }
};

export default DB