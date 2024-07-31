import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ideaSchema = new mongoose.Schema({
    ideaId: { type: Number, required: true, unique: true, primaryKey: true },
    ideaCategoryId: { type: Number, required: true, ref: 'IdeaCategory' },
    ideaStageId: { type: Number, required: true, ref: 'IdeaStage' },
    title: { type: String, required: true },
    problemStatement: { type: String, required: true },
    advantage: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    existingSolution: { type: String, required: true },
    presentableDate: { type: Date, required: true },
    functionId: { type: Number, required: true, ref: 'Function' },
    subdivisionId: { type: Number, required: true, ref: 'Subdivision' },
    isPrivate: { type: Boolean, default: false },
    coauthors: [{ type: String, ref: 'User' }],
    tags: [{ type: String, required: true }],
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ideaSchema.plugin(AutoIncrement, { inc_field: 'ideaId' });

export default mongoose.model('Idea', ideaSchema);
