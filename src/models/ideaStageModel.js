import mongoose from "mongoose";

const ideaStageSchema = new mongoose.Schema(
  {
    stageName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Stage = mongoose.model("IdeaStage", ideaStageSchema);

export default Stage;
