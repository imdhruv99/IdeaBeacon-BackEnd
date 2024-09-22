import mongoose from "mongoose";

const ideaVerticalSchema = new mongoose.Schema(
  {
    verticalName: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    deletedAT: { type: Date },
    deletedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Vertical = mongoose.model("IdeaVertical", ideaVerticalSchema);

export default Vertical;
