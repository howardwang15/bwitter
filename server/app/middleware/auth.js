const jwt = require("jsonwebtoken");

const isUserAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorized.",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  isUserAuthenticated,
};
