// const fs = require('fs');
// const path = require('path');

//1
/*
fs.readFile('./02.file/starter.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString()); //Hi, my name is chankyu
});

fs.readFile('./02.file/hello.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); //Hi, my name is chankyu
});
*/

//2
//exit on uncaught errors
//process.on('uncaughtException') 함수는 예기치 못한 오류가 발생하였을때 그것을 catch 해주는데요.
//이 함수를 사용하면 서버가 종료되는현상은 막을수 있습니다. 서버가 종료되지 않기때문에 정상적으로 에러 로그가 작성이 되더군요!!
//중요한점은 모든 에러를 uncaughtException로 잡을 생각을 하지 마시고 최대한 이전에 오류가 발생하지 않도록 소스코드를 잘 작성하는게 중요하다고 생각합니다!
//https://devyeogoo.tistory.com/8

// path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// // Returns: '/foo/bar/baz/asdf'

// fs.readFile(path.join(__dirname, '02.file', 'starter.txt'), (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.writeFile(path.join(__dirname, '02.file', 'reply.txt'), 'Nice to meet you', err => {
//   if (err) throw err;
//   console.log('Write complete');
// });

// fs.appendFile(path.join(__dirname, '02.file', 'test.txt'), 'Testing text', err => {
//   if (err) throw err;
//   console.log('Append complete');
// });

// console.log('Hello...');

// fs.writeFile(path.join(__dirname, '02.file', 'exercise.txt'), 'exercise write file.', err => {
//   if (err) throw err;

//   console.log('Write complete');
//   fs.appendFile(path.join(__dirname, '02.file', 'exercise.txt'), 'append exercise txt', err => {
//     if (err) throw err;
//     console.log('append complete');
//   });
// });

// process.on('uncaughtException', err => {
//   console.error(`There was an uncaught error: ${err}`);
//   process.exit(1);
// });
