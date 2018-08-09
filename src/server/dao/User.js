import mongoose from 'mongoose';
import Counter from './Counter';
import {randomAlphabetical} from './helper/generators';

const User = new mongoose.Schema({
    _id: String,
    firstName: String,
    lastName: String,
    company: String,
    dateOfBirth: {
        type: Date
    },
    address: {
        country: String,
        street: String
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

User.pre('save', function (next) {
    Counter.findByIdAndUpdate({_id: 'userId'}, {$inc: { seq: 1} })
        .then((counter) => {
            this.updatedAt = Date.now();
            this._id = counter.seq + randomAlphabetical(2);
            next();
        }).catch((error) => {
            next(error);
        });
});

User.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};

mongoose.model('User', User);
export default mongoose.model('User');
