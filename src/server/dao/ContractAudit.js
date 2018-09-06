import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    entityType: String,
    eventName: String,
    order: mongoose.Schema.Types.Mixed,
    data: mongoose.Schema.Types.Mixed,
    meta: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ContractAudit = new mongoose.Schema({
    events: [EventSchema],
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

ContractAudit.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

mongoose.model('ContractAudit', ContractAudit);
export default mongoose.model('ContractAudit');
