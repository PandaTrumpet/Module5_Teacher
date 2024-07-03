import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdatesSettings } from './hooks.js';

import { emailRegexp } from '../../constants/users-constans.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, // траба додати
  },
);

userSchema.post('save', mongooseSaveError); //це хук ,якщо сталася помилка
userSchema.pre('findOneAndUpdate', setUpdatesSettings);
userSchema.post('findOneAndUpdate', mongooseSaveError);

export const User = model('user', userSchema);
