import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';
import { compareHash } from '../utils/hash.js';
import { createSession } from '../services/session0servise.js';
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
  const { refreshToken, accessToken, _id, refreshTokenValidUntil } =
    await createSession(user._id);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.json({
    satus: 200,
    message: 'Successful',
    data: { accessToken: accessToken },
  });
};
