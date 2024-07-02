import { typeList } from '../constants/movies-constants.js';
const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;
  const parsedValue = Boolean(value);
  return parsedValue;
};
const parseMovieFilterParams = ({ type, favorite }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parseeFavorite = parseBoolean(favorite);
  return {
    type: parsedType,
    favorite: parseeFavorite,
  };
};

export default parseMovieFilterParams;
