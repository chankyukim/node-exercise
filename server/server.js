require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500; //process.env에 PORT가 있다면 PORT로, 아니라면 3500으로 속성에 값을 부여한다.
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
// const auth = require('./routes/auth');

//Connect to MongoDB
connectDB();

//Handle options credentials check - before cors!
//and fetch cookies credentials requirement
app.use(credentials);

//cors(cross origin resource sharing)
app.use(cors(corsOptions));

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root')); // === app.use('/api', auth);
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

//mongoose.connection은 mongoose로 연결한 첫번째 연결을 의미한다.
//mongoose로 DB 여러개를 연결 할 수 있다 하더라.
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
