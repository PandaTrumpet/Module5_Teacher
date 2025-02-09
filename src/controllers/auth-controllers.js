import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';
import { compareHash } from '../utils/hash.js';
import {
  createSession,
  deleteSession,
  findSession,
} from '../services/session0servise.js';

const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUntil, _id },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const signupController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    // throw createHttpError(409, 'Email or password invalid');
    throw createHttpError(409, 'Email already in use');
  }
  const newUser = await signup(req.body);

  const data = { name: newUser.name, email: newUser.email };
  res.status(201).json({
    status: 201,
    data,
    message: 'User signup successfuly',
  });
};
export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'Email not found');
    // throw createHttpError(401, "Email or password invalid")
  }
  const passwordCompare = await compareHash(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Password invalid');
  }
  const session = await createSession(user._id);
  setupResponseSession(res, session);
  res.json({
    satus: 200,
    message: 'Successful',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  // console.log(req.cookies); // после установки cookie-parser

  const { sessionId, refreshToken } = req.cookies;
  const currentSession = await findSession({ _id: sessionId, refreshToken }); // проверка на сессию

  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }
  const refreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (refreshTokenExpired) {
    throw createHttpError(401, 'Session expired');
  }
  const newSession = await createSession(currentSession.userId);
  setupResponseSession(res, newSession);
  res.json({
    satus: 200,
    message: 'Successful',
    data: { accessToken: newSession.accessToken },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }
  await deleteSession({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};
