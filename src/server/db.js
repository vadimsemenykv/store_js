import mongoose from 'mongoose'

class DB {}

DB.state = {
    connected: false,
};

DB.connect = (url, done) => {
    if (DB.state.db) return done();

    mongoose.connect(url, function(err){
        if (err) return done(err);
        DB.state.connected = true;
        done()
    });
};

DB.close = (done) => {
    if (DB.state.db) {
        mongoose.disconnect(function(err){
            DB.state.connected = false;
            done(err)
        });
    }
};

export default DB;