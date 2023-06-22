import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
    likes: { type: Array, required: true },
    comments: { type: Array, required: true },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
