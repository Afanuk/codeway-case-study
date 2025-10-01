import { Response } from 'express';

/**
 * Send success response with standardized format
 * @param res - Express response object
 * @param message - Success message
 * @param statusCode - HTTP status code (default: 200)
 * @param data - Response data
 */
export const sendSuccess = (
  res: Response, 
  message = 'Success', 
  statusCode = 200,
  data: any
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Send error response with standardized format
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 400)
 * @param error - Error details (only in development)
 */
export const sendError = (
  res: Response, 
  message: string, 
  statusCode = 400, 
  error?: any
) => {
  const response: any = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  // Only include error details in development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message || error;
  }

  return res.status(statusCode).json(response);
};
