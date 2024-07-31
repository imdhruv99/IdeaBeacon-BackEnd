import mongoose from 'mongoose';

const subdivisionSchema = new mongoose.Schema({
    subdivisionName: { type: String, required: true },
    functionId: { type: String, required: true, ref: 'Function' },
    createdBy: { type: String, required: true, ref: 'User' },
    updatedBy: { type: String, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Subdivision', subdivisionSchema);
