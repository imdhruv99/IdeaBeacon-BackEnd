import mongoose from 'mongoose';

const sharedIdeaSchema = new mongoose.Schema({
    ideaPostId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Idea' },
    authorId: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    sharedUsersIds: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('SharedIdea', sharedIdeaSchema);
