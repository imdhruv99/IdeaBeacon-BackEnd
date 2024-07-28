import mongoose from 'mongoose';

const ideaCategorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('IdeaCategory', ideaCategorySchema);
