import mongoose from "mongoose";

const ideaVerticalSchema = new mongoose.Schema(
  {
    verticalName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Vertical = mongoose.model("IdeaVertical", ideaVerticalSchema);

export default Vertical;
