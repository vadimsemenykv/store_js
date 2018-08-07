import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const Offer = new mongoose.Schema({
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
    basedOnOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    status: {
        type: String,
        default: 'active'
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    },
    price: Number,
    totalPrice: Number,
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

Offer.pre('save', (next) => {
    Counter.findByIdAndUpdate({_id: 'offerId'}, {$inc: { seq: 1} })
        .then((counter) => {
            this.updatedAt = Date.now();
            this._id = counter.seq + randomAlphabetical(2);
            next();
        }).catch((error) => {
            next(error);
        });
});

mongoose.model('Offer', Offer);
export default mongoose.model('Offer');

