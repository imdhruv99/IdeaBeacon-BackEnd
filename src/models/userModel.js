import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    oid: { type: String, unique: true },
    name: { type: String, required: true }, 
    preferredUsername: { type: String, required: true, unique: true },
    role: {type: String, required: true, ref: 'Role' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
