import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const ContractAudit = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    price: Number,
    quantity: Number,
    totalPrice: Number,
    // transaction: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Transaction'
    // },
    audit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContractAudit'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

Contract.pre('save', (next) => {
    Counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1} })
        .then((counter) => {
            this.updatedAt = Date.now();
            this._id = counter.seq + randomAlphabetical(2);
            next();
        }).catch((error) => {
            next(error);
        });
});

mongoose.model('Contract', Contract);
export default mongoose.model('Contract');
