const mongoose = require('mongoose');

const subdivisionSchema = new mongoose.Schema({
    subdivisionId: { type: String, required: true, unique: true },
    subdivisionName: { type: String, required: true },
    functionId: { type: String, required: true, ref: 'Function' },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Subdivision', subdivisionSchema);