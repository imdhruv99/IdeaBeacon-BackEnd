import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    ideaCategoryId: { type: mongoose.Schema.ObjectId, required: true, ref: 'IdeaCategory' },
    ideaStageId: { type: mongoose.Schema.ObjectId, required: true, ref: 'IdeaStage' },
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    advantage: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    existingSolution: { type: String, required: true },
    presentableDate: { type: Date, required: true },
    functionId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Function' },
    subdivisionId: { type: mongoose.Schema.ObjectId, required: true, ref: 'Subdivision' },
    isPrivate: { type: Boolean, default: false },
    coauthors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    tags: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    updatedBy: { type:  mongoose.Schema.ObjectId, required: true, ref: 'User' },
    deletedAT: {type: Date},
    deletedBy: { type:  mongoose.Schema.ObjectId, ref: 'User' },
    isActive: {type: Boolean, default: true},
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
