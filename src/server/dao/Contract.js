import mongoose from 'mongoose';

const Contract = new mongoose.Schema({
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
    this.updatedAt = Date.now();
    next();
});

mongoose.model('Contract', Contract);

export default mongoose.model('Contract');
