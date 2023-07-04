import express from "express";
import User from "../mongodb/models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.route("/register").post(async (req, res) => {
  // Hashing the password
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });

  // Generating the JWT
  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "1000d",
  });
  res.status(201).json({ user: { name: user.name }, token, message: 'Registered✅' });
});

// Login route
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Please enter all fields')
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password')
  }
  // compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password')
  }

  // Generating the JWT
  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "1000d",
  });
  res.status(201).json({ user: { name: user.name }, token, message: 'Logged In✅' });
});

export default router

