import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const subdivisionSchema = new mongoose.Schema({
    subDivisionId: { type: Number, required: true, unique: true, primaryKey: true },
    subdivisionName: { type: String, required: true },
    functionId: { type: Number, required: true, ref: 'Function' },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

subdivisionSchema.plugin(AutoIncrement, { inc_field: 'subDivisionId' });

export default mongoose.model('Subdivision', subdivisionSchema);
