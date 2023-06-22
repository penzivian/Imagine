import express from "express";
import authMiddleware from "../middlewares/authentication.js";

import Post from "../mongodb/models/post.js";

const router = express.Router();

// Route for creating likes
router.route("/likes/:postId").patch(authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  let post = await Post.findOne({ _id: postId });
  const isLiked = await post?.likes?.find((e) => {
    return e === userId;
  });
  if (isLiked) {
    res.status(404).json({ success: false, message: "Already Liked" });
  } else {
    post = await Post.findOneAndUpdate(
      { _id: postId },
      { likes: [...post?.likes, userId] },
      { new: true, runValidators: true }
    );
    res.status(201).json({ success: true, message: post });
  }
});

// Route for creating comments
router.route("/comments/:postId").patch(authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId, name } = req.user;
  const { comment } = req.body;

  let post = await Post.findOne({ _id: postId });
  post = await Post.findOneAndUpdate(
    { _id: postId },
    { comments: [...post?.comments, { userId, name, comment }] },
    { new: true, runValidators: true }
  );
  res.status(201).json({ success: true, message: { userId, name, comment } });
});

// Route for getting likes
router.route("/likes/:postId").get(async (req, res) => {
  const { postId } = req.params;
  let post = await Post.findOne({ _id: postId });

  res.status(200).json({ success: true, message: post.likes });
});

// Route for getting comments
router.route("/comments/:postId").get(async (req, res) => {
  const { postId } = req.params;
  let post = await Post.findOne({ _id: postId });

  res.status(200).json({ success: true, message: post.comments });
});

export default router;
