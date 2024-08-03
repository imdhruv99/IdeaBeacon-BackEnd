import mongoose from 'mongoose';

const functionSchema = new mongoose.Schema({
    functionName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Function', functionSchema);
