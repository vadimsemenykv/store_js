import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const Order = new mongoose.Schema({
    _id: String,
    _type: String,
    status: {
        type: String,
        default: 'deactivated'
    },
    owner: {
        type: String,
        ref: 'User'
    },
    currency: {
        type: String,
        ref: 'Currency'
    },
    categoryCollection: {
        type: String,
        ref: 'Collection'
    },
    offerOnly: {
        type: Boolean,
        default: false
    },
    price: Number,
    quantity: Number,
    totalPrice: Number,
    isVerified: {
        type: Boolean,
        default: false
    },
    reserved: {
        until: Date,
        by: {
            type: String,
            ref: 'User'
        }
    },
    contract: {
        type: String,
        ref: 'Contract'
    },
    availableStatus: {
        type: String,
        default: 'available'
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

Order.pre('save', function (next) {
    if (this.isNew) {
        Counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1} })
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

mongoose.model('Order', Order);
export default mongoose.model('Order');
