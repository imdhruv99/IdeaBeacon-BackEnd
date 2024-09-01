import mongoose from 'mongoose';

const demoDaySchema = new mongoose.Schema({
    number: { type: Number, required: true },
    year: { type: Number, required: true },
    isCurrent: { type: Boolean, default: false },
}, { timestamps: true });

const DemoDay = mongoose.model('DemoDay', demoDaySchema);

export default DemoDay;
