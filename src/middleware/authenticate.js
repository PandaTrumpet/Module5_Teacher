import createHttpError from 'http-errors';
import { findSession } from '../services/session0servise.js';
import { findUser } from '../services/auth-services.js';
export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(authHeader);

  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header missing')); //если вообще нету заголовка
  }
  const [bearer, accessToken] = authHeader.split(' '); //возвращает строку, разделенную на массив
  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Token must have Bearer type'));
  }
  if (!accessToken) {
    return next(createHttpError(401, 'Token missin'));
  }
  const session = await findSession({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Sesion not found'));
  }
  const accessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  //   console.log(accessTokenExpired);
  if (accessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  next();
};

// Проверка на валидность токена!!!!Посмотреть!
