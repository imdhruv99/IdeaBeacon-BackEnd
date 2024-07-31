import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ideaCategorySchema = new mongoose.Schema({
    ideaCategoryId: { type: Number, required: true, unique: true, primaryKey: true },
    categoryName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ideaCategorySchema.plugin(AutoIncrement, { inc_field: 'ideaCategoryId' });

export default mongoose.model('IdeaCategory', ideaCategorySchema);
