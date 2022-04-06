const usersDB = {
  users: require('../model/user.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: 'username and password are required.' });

  const foundUser = usersDB.users.find(person => person.username === user);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);

  //create JWT
  const accessToken = jwt.sign(
    { username: foundUser.username }, //
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username }, //
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
  // saving refreshToken with current user
  const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
  const currentUser = { ...foundUser, refreshToken };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'user.json'),
    JSON.stringify(usersDB.users)
  );

  res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken });
};

module.exports = { handleLogin };