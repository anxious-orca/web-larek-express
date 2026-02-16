import { Response } from 'express';
import AppError from '../errors/app-error';

const errorHandler = (
  err: unknown,
  res: Response,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof Error && err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};

export default errorHandler;
