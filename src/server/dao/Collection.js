import mongoose from 'mongoose'

const Collection = new mongoose.Schema({
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

Collection.pre('save', function(next) {
    this.updatedAt = Date.now();
    next()
});

mongoose.model('Collection', Collection);

export default mongoose.model('Collection');