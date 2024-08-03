import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    oid: { type: String, unique: true },
    name: { type: String, required: true }, 
    preferredUsername: { type: String, required: true, unique: true },
    role: {type: String, required: true, ref: 'Role' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
