import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    roleName: { type: String, unique: true },
    description: { type: String, required: false },
}, { timestamps: true });


export default mongoose.model('Role', roleSchema);
