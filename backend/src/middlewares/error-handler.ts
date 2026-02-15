import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/app-error';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // Handle known operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Handle Mongoose validation errors
  if (err instanceof Error && err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message
    });
  }

  // Fallback — unknown error
  return res.status(500).json({
    message: 'Internal server error'
  });
};

export default errorHandler;