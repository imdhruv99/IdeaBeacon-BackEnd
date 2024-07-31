import mongoose from 'mongoose';

const ideaCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    createdBy: { type: String, required: true, ref: 'User' },
    updatedBy: { type: String, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('IdeaCategory', ideaCategorySchema);
