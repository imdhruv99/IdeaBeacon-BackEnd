import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
