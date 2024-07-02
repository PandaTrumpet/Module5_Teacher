// console.log('JHello');
// import { releaseYearRegexp } from './constants/movies-constants.js';
// console.log(releaseYearRegexp.test('2000'));
import initMongoDB from './db/nitMongoDB.js';
import startServer from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};
bootstrap();
