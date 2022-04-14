//cors (Cross origin resource sharing)
//https://stackoverflow.com/questions/42589882/nodejs-cors-middleware-origin-undefined 왜 !origin을 해야하는지

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    // console.log('요청 클라이언트', origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
