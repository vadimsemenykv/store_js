import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const Offer = new mongoose.Schema({
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
    basedOnOffer: {
        type: String,
        ref: 'Offer'
    },
    status: {
        type: String,
        default: 'active'
    },
    contract: {
        type: String,
        ref: 'Contract'
    },
    price: Number,
    totalPrice: Number,
    audit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContractAudit'
    },
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

Offer.pre('save', function (next) {
    if (this.isNew) {
        Counter.findByIdAndUpdate({_id: 'offerId'}, {$inc: { seq: 1} })
            .then((counter) => {
                this.updatedAt = Date.now();
                this._id = counter.seq + randomAlphabetical(2);
                next();
            }).catch((error) => {
                next(error);
            });
    } else {
        this.updatedAt = Date.now();
        next();
    }
});

mongoose.model('Offer', Offer);
export default mongoose.model('Offer');

