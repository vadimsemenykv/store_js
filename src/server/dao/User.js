import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    dateOfBirth: {
        type: Date
    },
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

User.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

mongoose.model('User', User);

export default mongoose.model('User');