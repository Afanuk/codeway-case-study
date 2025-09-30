// Controller for managing client-side parameter requests
import { Request, Response } from 'express';
import * as parameterClientService from '../services/parameterClientService';
import { sendSuccess, sendError } from '../utils/responses';
import { HttpStatusCode } from '../types/api';

// Get all parameters for client applications
export const getAllParametersClient = async (req: Request, res: Response) => {
  console.log('getAllParametersClient controller called');

  try {
    const config = await parameterClientService.getAllParametersClient();
    sendSuccess(res, 'Configuration retrieved successfully', HttpStatusCode.OK, config);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve configuration', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};

