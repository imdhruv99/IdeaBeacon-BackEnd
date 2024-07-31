import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    oid: { type: String, unique: true }, // user.oid
    name: { type: String, required: true }, // user.displayName
    preferredUsername: { type: String, required: true, unique: true }, // user._json.preferred_username
    role: {type: String, required: true, ref: 'Role' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
