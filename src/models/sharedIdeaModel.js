import mongoose from 'mongoose';

const sharedIdeaSchema = new mongoose.Schema({
    sharedIdeaId: { type: String, required: true, unique: true },
    ideaPostId: { type: String, required: true, ref: 'Idea' },
    authorId: { type: String, required: true, ref: 'User' },
    sharedUsersIds: [{ type: String, ref: 'User' }],
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('SharedIdea', sharedIdeaSchema);
