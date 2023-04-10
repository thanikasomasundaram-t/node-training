const jwt = require('jsonwebtoken');
const constants = require('../constants');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, constants.SECRET_KEY, (err, user) => {
    if(err) {
      res.status(403).send({ message: "invalid token"})
    }
    req.user = user;
    next();
  });

}




module.exports = {
  authenticateToken,
}