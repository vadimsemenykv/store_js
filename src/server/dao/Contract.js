import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const Contract = new mongoose.Schema({
    _id: String,
    client: {
        type: String,
        ref: 'User'
    },
    merchant: {
        type: String,
        ref: 'User'
    },
    order: {
        type: String,
        ref: 'Order'
    },
    price: Number,
    quantity: Number,
    totalPrice: Number,
    // transaction: {
    //     type: String,
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

Contract.pre('save', function (next) {
    Counter.findByIdAndUpdate({_id: 'contractId'}, {$inc: { seq: 1} })
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
