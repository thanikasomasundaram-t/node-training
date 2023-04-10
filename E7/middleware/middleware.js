
const authenticateToken = (req, res, next) => {
  req.headers.username = "sin";
  next();
}


module.exports = {
  authenticateToken,
}