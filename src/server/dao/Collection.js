import mongoose from 'mongoose';
import Counter from './Counter';

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
    Counter.findByIdAndUpdate({_id: 'collectionId'}, {$inc: { seq: 1} })
        .then((counter) => {
            this.updatedAt = Date.now();
            this._id = counter.seq;
            next();
        }).catch((error) => {
            next(error);
        });
});

mongoose.model('Collection', Collection);
export default mongoose.model('Collection');
