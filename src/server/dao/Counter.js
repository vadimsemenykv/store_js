import mongoose from 'mongoose';

const Counter = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 }
});

mongoose.model('Counter', Counter);

export default mongoose.model('Counter');
