import mongoose from "mongoose";

const ideaCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    updatedBy: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Category = mongoose.model("IdeaCategory", ideaCategorySchema);

export default Category;
