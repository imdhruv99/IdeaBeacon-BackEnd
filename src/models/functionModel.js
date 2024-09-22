import mongoose from "mongoose";

const functionSchema = new mongoose.Schema(
  {
    functionName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deletedAT: { type: Date },
    deletedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Function = mongoose.model("Function", functionSchema);
export default Function;
