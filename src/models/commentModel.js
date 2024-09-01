import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  comment: { type: String, required: true, trim: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true, trim: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
});

const IdeaCommentSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
  comments: [CommentSchema],
});

const Comment = mongoose.model("Comment", IdeaCommentSchema);

export default Comment;
