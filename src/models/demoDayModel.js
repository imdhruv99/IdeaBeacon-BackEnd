import mongoose from "mongoose";

const demoDaySchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    year: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    deletedAT: { type: Date },
    deletedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const DemoDay = mongoose.model("DemoDay", demoDaySchema);

export default DemoDay;
