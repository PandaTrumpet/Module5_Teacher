export const mongooseSaveError = (error, data, next) => {
  const { name, code } = error;

  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};
export const setUpdatesSettings = function (next) {
  this.options.new = true; //  верни обновленній об'єкт
  this.options.runValidators = true; ///для испльзования валидатора во время обновления
  next();
};
