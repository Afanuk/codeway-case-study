import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/responses";
import { auth } from "../config/firebase";
import { User } from "../models/User";
import { HttpStatusCode } from "../types/api";

// This extends the Express Request interface to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * 
 * Firebase ID Token Authentication Middleware
 * This checks for a valid Firebase ID token in the Authorization header
 */
export const authenticateFirebaseToken = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No valid authorization token provided', HttpStatusCode.UNAUTHORIZED, null);
    }

    // Extract the token from the "Bearer <token>" format
    const idToken = authHeader.split('Bearer ')[1];
    console.log('Verifying Firebase ID token:', idToken);

    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log('Firebase ID token verified:', decodedToken);

    // Create and attach user info to request object
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email || '',
    };
    console.log('User info attached to req.user:', req.user);

    // Call next() to proceed to the next middleware/controller
    next();
  } catch (error: any) {
    console.error('Error verifying Firebase ID token:', error);
    return sendError(res, 'Invalid or expired token', HttpStatusCode.UNAUTHORIZED, error);
  }

}

/**
 * Static API Token Authentication Middleware
 * This checks for a static API token in the X-API-Token header
 * Used for mobile app access (not Firebase token validation)
 */
export const authenticateApiToken = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const apiToken = req.headers['x-api-token'] as string;
    if (!apiToken) {
      return sendError(res, 'No API token provided', HttpStatusCode.UNAUTHORIZED, null);
    }
    
    // Compare with static API token from environment
    const validApiToken = process.env.MOBILE_API_TOKEN || 'default-mobile-api-token-2024';
    if (apiToken !== validApiToken) {
      return sendError(res, 'Invalid API token', HttpStatusCode.UNAUTHORIZED, null);
    }

    // If valid, proceed to next middleware/controller
    console.log('Static API token verified for mobile app access');
    next();
  } catch (error: any) {
    console.error('Error verifying API token:', error);
    return sendError(res, 'Invalid or expired API token', HttpStatusCode.UNAUTHORIZED, error);
  }
}