import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    ideaCategoryId: { type: String, required: true, ref: 'IdeaCategory' },
    ideaStageId: { type: String, required: true, ref: 'IdeaStage' },
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    advantage: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    existingSolution: { type: String, required: true },
    presentableDate: { type: Date, required: true },
    functionId: { type: String, required: true, ref: 'Function' },
    subdivisionId: { type: String, required: true, ref: 'Subdivision' },
    isPrivate: { type: Boolean, default: false },
    coauthors: [{ type: String, ref: 'User' }],
    tags: [{ type: String, required: true }],
    createdBy: { type: String, required: true, ref: 'User' },
    updatedBy: { type: String, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Idea', ideaSchema);
