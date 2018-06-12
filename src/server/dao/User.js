import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
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

User.pre('save', function(next) {
    this.updatedAt = Date.now();
    next()
});

mongoose.model('User', User);

export default mongoose.model('User');