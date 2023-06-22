import express from "express";
import jwt from "jsonwebtoken";
import User from '../mongodb/models/user.js'

const router = express.Router();

router.route("/checklogin").post(async (req, res) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(('error'));
    throw new Error('Authentication invalid')
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, "jwtSecret");
    // attach the user to the job routes
    // req.user = { userId: payload.userId, name: payload.name };
    const user = await User.findOne({_id: payload.userId})
    if (user) {
        res.status(200).json({success: true, message: user})
    } else {
        res.status(401).json({success: false})
    }
  } catch (error) {
    throw new Error('Authentication invalid')
  }
});

export default router;
