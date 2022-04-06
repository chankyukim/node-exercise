const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer toekn
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log('decoded', decoded);
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.username;
    console.log('req.user', req.user);
    next();
  });
};

module.exports = verifyJWT;
