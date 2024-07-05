import { randomBytes } from 'node:crypto';
import { SessionCollection } from '../db/models/Session.js';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/index.js';

export const findSession = (filter) => SessionCollection.findOne(filter);

export const createSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);
  return SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (filter) => SessionCollection.deleteOne(filter);
