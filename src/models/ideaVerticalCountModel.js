import mongoose from "mongoose";

const ideaVerticalCountSchema = new mongoose.Schema(
  {
    vertical: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "IdeaVertical"
    },
    count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const IdeaVerticalCount = mongoose.model("IdeaVerticalCount", ideaVerticalCountSchema);

export default IdeaVerticalCount;
