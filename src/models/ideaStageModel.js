import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ideaStageSchema = new mongoose.Schema({
    ideaStageId: { type: Number, required: true, unique: true, primaryKey: true },
    stageName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ideaStageSchema.plugin(AutoIncrement, { inc_field: 'ideaStageId' });

export default mongoose.model('IdeaStage', ideaStageSchema);
