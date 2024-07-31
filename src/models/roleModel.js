import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    roleName: { type: String, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });


export default mongoose.model('User', roleSchema);
