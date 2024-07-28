import mongoose from 'mongoose';

const ideaStageSchema = new mongoose.Schema({
    stageId: { type: String, required: true, unique: true },
    stageName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('IdeaStage', ideaStageSchema);
