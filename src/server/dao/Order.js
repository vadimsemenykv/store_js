import mongoose from 'mongoose';

const Order = new mongoose.Schema({
    _type: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
    },
    categoryCollection: {
        type: mongoose.Schema.Types.ObjectId,
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
    this.updatedAt = Date.now();
    next();
});

mongoose.model('Order', Order);

export default mongoose.model('Order');
