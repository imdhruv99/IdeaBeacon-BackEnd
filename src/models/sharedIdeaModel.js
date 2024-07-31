import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const sharedIdeaSchema = new mongoose.Schema({
    sharedIdeaId: { type: Number, required: true, unique: true, primaryKey: true },
    ideaPostId: { type: Number, required: true, ref: 'Idea' },
    authorId: { type: String, required: true, ref: 'User' },
    sharedUsersIds: [{ type: String, ref: 'User' }],
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

sharedIdeaSchema.plugin(AutoIncrement, { inc_field: 'sharedIdeaId' });

export default mongoose.model('SharedIdea', sharedIdeaSchema);
