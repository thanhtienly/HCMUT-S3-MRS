const authorizedUserIdMiddleware = (req, res, next) => {
  const userId = req.headers["user-id"];

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "UserId is missing",
    });
  }

  req["userId"] = userId;
  next();
};

module.exports = { authorizedUserIdMiddleware };
