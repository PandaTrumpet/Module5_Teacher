import { HttpError } from 'http-errors';
export const errorHandler = (error, _, res, next) => {
  if (error instanceof HttpError) {
    const { status, message, errors } = error;
    res.status(status).json({
      status,
      message,
      data: errors || error,
    });
    return;
  }
  const { status = 500, message = 'Something went wrong' } = error;
  // console.log(error.status);
  res.status(status).json({
    status,
    message,
    data: error.message,
  });
};
