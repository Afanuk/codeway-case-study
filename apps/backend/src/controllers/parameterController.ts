// Parameter controller for handling parameter-related requests
import { Request, Response } from 'express';
import * as parameterService from '../services/parameterService';
import { Parameter } from '../models/Parameter';

// Create or update a parameter
export const insertParameter = async (req: Request, res: Response) => {
  try {
    const param: Parameter = req.body;
    const newParam = await parameterService.insertParameter(param);
    res.status(201).json(newParam);
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert parameter', details: error });
  }
}

// Update a parameter
export const updateParameter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates: Partial<Parameter> = req.body;
    const updatedParam = await parameterService.updateParameter(id, updates);
    if (updatedParam) {
      res.status(201).json(updatedParam);
    } else {
      res.status(404).json({ error: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update parameter', details: error });
  }
}

// Get all parameters
export const getAllParameters = async (req: Request, res: Response) => {
  try {
    const params: Parameter[] = await parameterService.getAllParameters();
    if (params.length > 0) {
      res.status(200).json(params);
    } else {
      res.status(404).json({ error: 'No parameters found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parameters', details: error });
  } 
}

// Get parameter by key
export const getParameterByKey = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    const param = await parameterService.getParameterByKey(key);
    if (param) {
      res.status(200).json(param);
    } else {
      res.status(404).json({ error: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parameter', details: error });
  }
}

// Get parameter by ID
export const getParameterById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const param = await parameterService.getParameterById(id);
    if (param) {
      res.status(200).json(param);
    } else {
      res.status(404).json({ error: 'Parameter not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parameter', details: error });
  }
}


// Delete a parameter
export const deleteParameter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await parameterService.deleteParameter(id);
    res.status(200).json({ message: 'Parameter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete parameter', details: error });
  }
}
