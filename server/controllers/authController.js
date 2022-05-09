//mongoDB에 연결했을 때
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: 'username and password are required.' });

  const foundUser = await User.findOne({ username: user }).exec();
  // console.log('foundUser', foundUser);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);
  // if (!match) return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
  const roles = Object.values(foundUser.roles).filter(Boolean); // [2001] 이런식

  //create JWT
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles,
      },
    }, //
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username }, //
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  // saving refreshToken with current user
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  // console.log('result', result);

  //위의 코드와 같음
  // await User.findOneAndUpdate({ username: foundUser.username }, { refreshToken });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, //1day
  });

  res.json({ accessToken, roles });
};

module.exports = { handleLogin };

//mongoDB에 연결 안하고 json 파일을 DB로 사용했을 때

// const usersDB = {
//   users: require('../model/user.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const fsPromises = require('fs').promises;
// const path = require('path');
// // require('dotenv').config();

// const handleLogin = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd)
//     return res.status(400).json({ message: 'username and password are required.' });

//   const foundUser = usersDB.users.find(person => person.username === user);
//   if (!foundUser) return res.sendStatus(401); //Unauthorized

//   //evaluate password
//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (!match) return res.sendStatus(401);
//   const roles = Object.values(foundUser.roles); // [2001] 이런식
//   //create JWT
//   const accessToken = jwt.sign(
//     {
//       UserInfo: {
//         username: foundUser.username,
//         roles,
//       },
//     }, //
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: '1d' }
//   );
//   const refreshToken = jwt.sign(
//     { username: foundUser.username }, //
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: '1d' }
//   );
//   // saving refreshToken with current user
//   const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
//   const currentUser = { ...foundUser, refreshToken };
//   usersDB.setUsers([...otherUsers, currentUser]);

//   await fsPromises.writeFile(
//     path.join(__dirname, '..', 'model', 'user.json'),
//     JSON.stringify(usersDB.users)
//   );

//   res.cookie('jwt', refreshToken, {
//     httpOnly: true,
//     sameSite: 'None',
//     // secure: true,
//     maxAge: 24 * 60 * 60 * 1000, //1day
//   });
//   res.json({ accessToken });
// };

// module.exports = { handleLogin };
