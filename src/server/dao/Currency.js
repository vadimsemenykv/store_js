import mongoose from 'mongoose'

const Currency = new mongoose.Schema({
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

Currency.pre('save', function(next) {
    this.updatedAt = Date.now();
    next()
});

mongoose.model('Currency', Currency);

export default mongoose.model('Currency');