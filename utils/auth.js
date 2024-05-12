const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authToken = req.cookies.authToken;
  if (!authToken) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(authToken, process.env.SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token is not valid or it's expired" });
  }
};

module.exports = {
  ensureAuthenticated,
};
