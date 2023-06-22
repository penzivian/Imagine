// const User = require('../models/User')
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error('Authentication invalid')
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, 'jwtSecret');
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new Error('Authentication invalid')
  }
};

export default auth
