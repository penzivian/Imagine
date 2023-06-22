const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong try again later",
  };    

  if (err.name === "ValidatorError") {
    return res.status(400).json({ success: false, message: "ValidatorError" });
  }

  if (err.code && err.code === 11000) {
    return res
      .status(400)
      .json({ success: false, message: "Email Already Exists" });
  }

  if (err.name === "CastError") {
    return res
      .status(404)
      .json({ success: false, message: "No item found with this id" });
  }

  return res.status(customError.statusCode).json({ message: customError.msg })
};

export default errorHandlerMiddleware
