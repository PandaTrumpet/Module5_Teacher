import { Schema, model } from 'mongoose';
import {
  releaseYearRegexp,
  typeList,
} from '../../constants/movies-constants.js';
import { mongooseSaveError, setUpdatesSettings } from './hooks.js';

const movieSchema = new Schema(
  {
    director: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title must be'], //добавление кастмного сообщения об ошибки
    },
    type: {
      type: String,
      enum: typeList,
      default: 'film',
    },
    releaseYear: {
      type: String,
      match: releaseYearRegexp,
      // /^\d{4}$/, // регулярное віражение для коллисечтва сиволов( используеться для строки)
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true, // траба додати
  },
);

movieSchema.post('save', mongooseSaveError); //це хук ,якщо сталася помилка
movieSchema.pre('findOneAndUpdate', setUpdatesSettings);
movieSchema.post('findOneAndUpdate', mongooseSaveError);

const Movie = model('movie', movieSchema);
export default Movie;
