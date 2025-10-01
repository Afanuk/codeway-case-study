// Controller for managing client-side parameter requests
import { Request, Response } from 'express';
import * as parameterClientService from '../services/parameterClientService';
import { sendSuccess, sendError } from '../utils/responses';
import { HttpStatusCode } from '../types/api';

// Get all parameters for client applications
export const getAllParametersClient = async (req: Request, res: Response) => {
  console.log('getAllParametersClient controller called');

  try {
    const country = req.query.country ? req.query.country.toString() : 'default';
    console.log('Country query parameter:', country);

    const config = await parameterClientService.getAllParametersClient(country);
    sendSuccess(res, 'Configuration retrieved successfully', HttpStatusCode.OK, config);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve configuration', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};

// Get a parameter by its key for client applications
export const getParameterByKeyClient = async (req: Request, res: Response) => {
  const { key } = req.params;
  console.log(`getParameterByKeyClient controller called with key: ${key}`);

  try {
    const country = req.query.country ? req.query.country.toString() : 'default';
    console.log('Country query parameter:', country);

    const parameter = await parameterClientService.getParameterByKeyClient(key, country);
    if (!parameter) {
      return sendError(res, 'Parameter not found', HttpStatusCode.NOT_FOUND, null);
    }
    sendSuccess(res, 'Parameter retrieved successfully', HttpStatusCode.OK, parameter);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};
