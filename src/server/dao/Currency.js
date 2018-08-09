import mongoose from 'mongoose';
import Counter from './Counter';

const Currency = new mongoose.Schema({
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

Currency.pre('save', function (next) {
    Counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1} })
        .then((counter) => {
            this.updatedAt = Date.now();
            this._id = counter.seq;
            next();
        }).catch((error) => {
            next(error);
        });
});

mongoose.model('Currency', Currency);
export default mongoose.model('Currency');
