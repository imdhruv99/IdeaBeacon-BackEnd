import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const functionSchema = new mongoose.Schema({
    functionId: { type: Number, required: true, unique: true, primaryKey: true },
    functionName: { type: String, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

functionSchema.plugin(AutoIncrement, { inc_field: 'functionId' });

export default mongoose.model('Function', functionSchema);
