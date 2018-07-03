import mongoose from 'mongoose'

const Order = new mongoose.Schema({
    owner: mongoose.Schema.Types.ObjectId,
    _type: String,
    currency: {
        _id: mongoose.Schema.Types.ObjectId,
        uid: String,
    },
    categoryCollection: {
        _id: mongoose.Schema.Types.ObjectId,
        uid: String,
    },
    offerOnly: Boolean,
    price: Number,
    quantity: Number,
    totalPrice: Number,
    isVerified: Boolean,
    availableStatus: String,
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

Order.pre('save', function(next) {
    this.updatedAt = Date.now();
    next()
});

mongoose.model('Order', Order);

export default mongoose.model('Order');