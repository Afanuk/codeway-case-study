// Parameter controller for handling parameter-related requests
import { Request, Response } from 'express';
import * as parameterService from '../services/parameterService';
import { Parameter } from '../models/Parameter';
import { sendSuccess, sendError } from '../utils/responses';

// Create a new parameter
export const createParameter = async (req: Request, res: Response) => {
  try {
    const paramData: Omit<Parameter, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    
    // Basic validation
    if (!paramData.parameterKey || !paramData.value) {
      return sendError(res, 'Parameter key and value are required', 400);
    }

    const parameter = await parameterService.createParameter(paramData);
    sendSuccess(res, parameter, 'Parameter created successfully', 201);
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      sendError(res, error.message, 409, error);
    } else {
      sendError(res, 'Failed to create parameter', 500, error);
    }
  }
};

// Update a parameter
export const updateParameter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates: Partial<Parameter> = req.body;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', 400);
    }

    const updatedParam = await parameterService.updateParameter(id, updates);
    
    if (!updatedParam) {
      return sendError(res, 'Parameter not found', 404);
    }

    sendSuccess(res, updatedParam, 'Parameter updated successfully');
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      sendError(res, error.message, 409, error);
    } else {
      sendError(res, 'Failed to update parameter', 500, error);
    }
  }
};

// Get all parameters
export const getAllParameters = async (req: Request, res: Response) => {
  try {
    const parameters: Parameter[] = await parameterService.getAllParameters();
    sendSuccess(res, parameters, `Retrieved ${parameters.length} parameters`);
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameters', 500, error);
  }
};

// Get parameter by key
export const getParameterByKey = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    
    if (!key) {
      return sendError(res, 'Parameter key is required', 400);
    }

    const parameter = await parameterService.getParameterByKey(key);
    
    if (!parameter) {
      return sendError(res, `Parameter with key '${key}' not found`, 404);
    }

    sendSuccess(res, parameter, 'Parameter retrieved successfully');
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameter', 500, error);
  }
};

// Get parameter by ID
export const getParameterById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', 400);
    }

    const parameter = await parameterService.getParameterById(id);
    
    if (!parameter) {
      return sendError(res, `Parameter with ID '${id}' not found`, 404);
    }

    sendSuccess(res, parameter, 'Parameter retrieved successfully');
  } catch (error: any) {
    sendError(res, 'Failed to retrieve parameter', 500, error);
  }
};

// Delete a parameter
export const deleteParameter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return sendError(res, 'Parameter ID is required', 400);
    }

    const deleted = await parameterService.deleteParameter(id);
    
    if (!deleted) {
      return sendError(res, `Parameter with ID '${id}' not found`, 404);
    }

    sendSuccess(res, null, 'Parameter deleted successfully');
  } catch (error: any) {
    sendError(res, 'Failed to delete parameter', 500, error);
  }
};
