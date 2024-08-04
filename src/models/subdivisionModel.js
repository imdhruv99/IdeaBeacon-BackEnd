import mongoose from "mongoose";

const subdivisionSchema = new mongoose.Schema(
  {
    subdivisionName: { type: String, required: true },
    functionId: { type: mongoose.Schema.ObjectId, required: true, ref: "Function" },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Subdivision = mongoose.model("Subdivision", subdivisionSchema);
export default Subdivision;
