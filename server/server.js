const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500; //process.env에 PORT가 있다면 PORT로, 아니라면 3500으로 속성에 값을 부여한다.
const errorHandler = require('./middleware/errorHandler');
// const auth = require('./routes/auth');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
