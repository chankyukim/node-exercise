// const nodeMailer = require('nodemailer');

// const mailer = async username => {
//   const transporter = await nodeMailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true,
//     auth: {
//       user: `cksrb0707@gmail.com`,
//       pass: 'rb180814ww!',
//     },
//   });

//   const mailOption = {
//     from: `cksrb0707@gmail.com`,
//     to: `cksrb0707@gmail.com`,
//     html: `${username} 안녕하세요.`,
//   };

//   try {
//     transporter.sendMail(mailOption);
//     return 'success';
//   } catch (error) {
//     console.log(error);
//   }
// };

// const sendMailHandle = async (req, res) => {
//   const { user } = req.body;
//   const response = await mailer(user);
//   // console.log('response', response);
// };

// module.exports = { sendMailHandle };
