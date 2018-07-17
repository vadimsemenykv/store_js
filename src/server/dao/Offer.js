import mongoose from 'mongoose';

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
    status: {
        type: String,
        default: 'active'
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

Offer.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

mongoose.model('Offer', Offer);

export default mongoose.model('Offer');
