//mongoDB에 연결 안하고 json 파일을 DB로 사용했을 때

// const usersDB = {
//   users: require('../model/user.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require('fs').promises;
// const path = require('path');
// const bcrypt = require('bcrypt');

// const handleNewUser = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd)
//     return res.status(400).json({
//       message: 'Username and password are required.',
//     });
//   //check for duplicate username in the db
//   const duplicate = usersDB.users.find(person => person.username === user);
//   if (duplicate) return res.sendStatus(409); //conflict
//   try {
//     //encrypt the password
//     const hashedPwd = await bcrypt.hash(pwd, 10);
//     //store the new user
//     const newUser = {
//       username: user,
//       roles: {
//         User: 2001,
//       },
//       password: hashedPwd,
//     };
//     usersDB.setUsers([...usersDB.users, newUser]);
//     await fsPromises.writeFile(
//       path.join(__dirname, '..', 'model', 'user.json'),
//       JSON.stringify(usersDB.users)
//     );
//     res.status(201).json({ success: `New User ${user} created!` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { handleNewUser };

// mongoDB에 연결

const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: 'Username and password are required.',
    });

  //check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  console.log('duplicate', duplicate);
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    //위의 코드를 다른 방식으로 db에 저장하는 법
    // const newUser = new User({
    //   username: user,
    //   password: hashedPwd,
    // });
    // newUser.save();

    console.log('result', result);

    res.status(201).json({ success: `New User ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
