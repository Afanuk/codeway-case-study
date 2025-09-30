// Parameter controller for handling parameter-related requests
import { Request, Response } from 'express';
import * as parameterService from '../services/parameterPanelService';
import { Parameter } from '../models/Parameter';
import { sendSuccess, sendError } from '../utils/responses';
import { HttpStatusCode } from '../types/api';

// Create a new parameter
export const createParameter = async (req: Request, res: Response) => {
  console.log('createParameter controller called');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const paramData: Omit<Parameter, 'id' | 'createdAt'> = req.body;
    
    // Basic validation
    if (!paramData.parameterKey || !paramData.value) {
      return sendError(res, 'Parameter key and value are required', 400);
    }

    // To track who created the parameter
    paramData.createdBy = req.user?.id;

    const parameter = await parameterService.createParameter(paramData);
    sendSuccess(res, 'Parameter created successfully', 201, parameter);
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      sendError(res, error.message, HttpStatusCode.CONFLICT, error);
    } else {
      sendError(res, 'Failed to create parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
    }
  }
};

// Update a parameter
export const updateParameter = async (req: Request, res: Response) => {
  console.log('updateParameter controller called');
  console.log('Parameter ID:', req.params.id);
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const id = req.params.id;
    const updates: Partial<Parameter> = req.body;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', 400);
    }

    // To track who updated the parameter
    updates.updatedBy = req.user?.id; 

    const updatedParam = await parameterService.updateParameter(id, updates);
    
    if (!updatedParam) {
      return sendError(res, 'Parameter not found', HttpStatusCode.NOT_FOUND, null);
    }

    sendSuccess(res, 'Parameter updated successfully', HttpStatusCode.OK, updatedParam);
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      sendError(res, error.message, HttpStatusCode.CONFLICT, error);
    } else {
      sendError(res, 'Failed to update parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
    }
  }
};

// Get all parameters
export const getAllParametersPanel = async (req: Request, res: Response) => {
  console.log('getAllParametersPanel controller called');

  try {
    const parameters: Parameter[] = await parameterService.getAllParametersPanel();
    sendSuccess(res, `Retrieved ${parameters.length} parameters`, HttpStatusCode.OK, parameters);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameters', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};

// Get parameter by ID
export const getParameterById = async (req: Request, res: Response) => {
  console.log('getParameterById controller called');
  console.log('Parameter ID:', req.params.id);
  
  try {
    const id = req.params.id;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', HttpStatusCode.BAD_REQUEST, null);
    }

    const parameter = await parameterService.getParameterById(id);
    
    if (!parameter) {
      return sendError(res, `Parameter with ID '${id}' not found`, HttpStatusCode.NOT_FOUND, null);
    }

    sendSuccess(res, 'Parameter retrieved successfully', HttpStatusCode.OK, parameter);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};

// Get parameter by key
export const getParameterByKey = async (req: Request, res: Response) => {
  console.log('getParameterByKey controller called');
  console.log('Parameter key:', req.params.key);
  
  try {
    const key = req.params.key;
    
    if (!key) {
      return sendError(res, 'Parameter key is required', HttpStatusCode.BAD_REQUEST, null);
    }

    const parameter = await parameterService.getParameterByKey(key);
    
    if (!parameter) {
      return sendError(res, `Parameter with key '${key}' not found`, HttpStatusCode.NOT_FOUND, null);
    }

    sendSuccess(res, 'Parameter retrieved successfully', HttpStatusCode.OK, parameter);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};

// Delete a parameter
export const deleteParameter = async (req: Request, res: Response) => {
  console.log('deleteParameter controller called');
  console.log('Parameter ID to delete:', req.params.id);
  
  try {
    const id = req.params.id;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', HttpStatusCode.BAD_REQUEST, null);
    }

    const deleted = await parameterService.deleteParameter(id);
    console.log('Deleted parameter:', deleted);
    
    if (!deleted) {
      return sendError(res, `Parameter with ID '${id}' not found`, 404);
    }

    sendSuccess(res, 'Parameter deleted successfully', HttpStatusCode.NO_CONTENT, null);
  } catch (error: any) {
    sendError(res, 'Failed to delete parameter', HttpStatusCode.INTERNAL_SERVER_ERROR, error);
  }
};
