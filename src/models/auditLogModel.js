import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    auditLogId: { type: String, required: true, unique: true },
    eventName: { type: String, required: true },
    details: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);
