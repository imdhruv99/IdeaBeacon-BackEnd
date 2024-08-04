import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    details: { type: String, required: true },
    ideaID: {type: mongoose.Schema.ObjectId, required: true, ref: 'Idea' },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const auditLog = mongoose.model('AuditLog', auditLogSchema)
export default auditLog;
