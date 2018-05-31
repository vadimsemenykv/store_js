import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});

mongoose.model('User', User);

export default mongoose.model('User');