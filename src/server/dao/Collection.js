import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from "./helper/generators";

const Collection = new mongoose.Schema({
    _id: String,
    title: String,
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

Collection.pre('save', function (next) {
    if (this.isNew) {
        Counter.findByIdAndUpdate({_id: 'collectionId'}, {$inc: { seq: 1} })
            .then((counter) => {
                this.updatedAt = Date.now();
                this._id = counter.seq;
                next();
            }).catch((error) => {
                next(error);
            });
    } else {
        this.updatedAt = Date.now();
        next();
    }
});

mongoose.model('Collection', Collection);
export default mongoose.model('Collection');
