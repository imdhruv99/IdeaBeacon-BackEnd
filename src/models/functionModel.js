import mongoose from 'mongoose';

const functionSchema = new mongoose.Schema({
    functionId: { type: String, required: true, unique: true },
    functionName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Function', functionSchema);
