const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log('authHeader', authHeader);

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1]; //Bearer token
  jwt.verify(
    token, //
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      // console.log('decoded', decoded);
      console.log('토큰만료 err', err);
      if (err) return res.sendStatus(403); //invalid token
      console.log('decoded', decoded);
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      console.log('req.user', req.user);
      next();
    }
  );
};

module.exports = verifyJWT;
