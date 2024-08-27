import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    ideaVerticalId: { type: mongoose.Schema.ObjectId, required: true, ref: 'IdeaVertical' },
    ideaStageId: { type: mongoose.Schema.ObjectId, required: true, ref: 'IdeaStage' },
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    advantage: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    existingSolution: { type: String, required: true },
    functionId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Function' },
    subdivisionId: { type: mongoose.Schema.Types.Mixed, ref: 'Subdivision' },
    coauthors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }],
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    deletedAT: { type: Date },
    deletedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
