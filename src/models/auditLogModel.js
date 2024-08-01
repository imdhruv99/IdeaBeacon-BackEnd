import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    details: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);
