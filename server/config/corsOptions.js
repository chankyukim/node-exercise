//cors (Cross origin resource sharing)
//https://stackoverflow.com/questions/42589882/nodejs-cors-middleware-origin-undefined 왜 !origin을 해야하는지

const whitelist = [
  'https://www.google.com',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'https://www.naver.com',
]; //클라이언트의 요청 허용 사이트

const corsOptions = {
  origin: (origin, callback) => {
    console.log('요청 클라이언트', origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
