import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const auditLogSchema = new mongoose.Schema({
    auditLogId: { type: Number, required: true, unique: true, primaryKey: true },
    eventName: { type: String, required: true },
    details: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

auditLogSchema.plugin(AutoIncrement, { inc_field: 'auditLogId' });

export default mongoose.model('AuditLog', auditLogSchema);
