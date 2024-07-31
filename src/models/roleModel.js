import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const roleSchema = new mongoose.Schema({
    roleName: { type: String, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

roleSchema.plugin(AutoIncrement, { inc_field: 'roleId' });

export default mongoose.model('User', roleSchema);
