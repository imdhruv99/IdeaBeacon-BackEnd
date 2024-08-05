import mongoose from "mongoose";

const ideaStageCountSchema = new mongoose.Schema(
  {
    stage: { 
      type: mongoose.Schema.ObjectId, 
      required: true, 
      ref: "IdeaStage" 
    },
    count: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

const IdeaStageCount = mongoose.model("IdeaStageCount", ideaStageCountSchema);

export default IdeaStageCount;
