import mongoose from "mongoose";

const ideaCategoryCountSchema = new mongoose.Schema(
  {
    category: { 
      type: mongoose.Schema.ObjectId, 
      required: true, 
      ref: "IdeaCategory" 
    },
    count: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

const IdeaCategoryCount = mongoose.model("IdeaCategoryCount", ideaCategoryCountSchema);

export default IdeaCategoryCount;
