//mongoDB에 연결 안하고 json 파일을 DB로 사용했을 때

// const usersDB = {
//   users: require('../model/user.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require('fs').promises;
// const path = require('path');

// const handleLogout = async (req, res) => {
//   //on client, also delete accessToken
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); //No content
//   const refreshToken = cookies.jwt;

//   //Is refreshToken in db?
//   const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
//   if (!foundUser) {
//     res.clearCookie('jwt', {
//       httpOnly: true,
//       sameSite: 'None',
//       secure: true,
//     }); //, maxAge: 24 * 60 * 60 * 1000
//     return res.sendStatus(204);
//   }

//   //Delete refreshToken in db
//   const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
//   const currentUser = { ...foundUser, refreshToken: '' };
//   usersDB.setUsers([...otherUsers, currentUser]);
//   await fsPromises.writeFile(
//     path.join(__dirname, '..', 'model', 'user.json'),
//     JSON.stringify(usersDB.users)
//   );

//   res.clearCookie('jwt', {
//     httpOnly: true,
//     sameSite: 'None',
//     secure: true,
//   }); //secure : true - only serves on https

//   res.sendStatus(204);
// };

// module.exports = { handleLogout };

//mongoDB에 연결했을 때

const User = require('../model/User');

const handleLogout = async (req, res) => {
  //on client, also delete accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    }); //, maxAge: 24 * 60 * 60 * 1000
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log('result', result);

  //위의 코드와 같다.
  // await User.findOneAndUpdate({ username: foundUser.username }, { refreshToken: '' });

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  }); //secure : true - only serves on https

  res.sendStatus(204);
};

module.exports = { handleLogout };
