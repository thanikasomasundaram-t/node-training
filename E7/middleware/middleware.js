const jwt = require('jsonwebtoken');
const constants = require('../constants');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token) {
    jwt.verify(token, constants.SECRET_KEY, (err, user) => {
      if(err) {
        res.status(403).send({ message: "invalid token"})
      }
      req.user = user;
      next();
      return;
    });
  }
  else {
    res.status(403).send("Access denied");
  }
}

module.exports = {
  authenticateToken,
}