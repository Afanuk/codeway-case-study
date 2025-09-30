// Parameter service for handling parameter-related API calls
import type { Parameter } from "../types/parameter"
import type { ErrorResponse, ParameterResponse, ParameterListResponse } from "../types/api"
import { useAuth } from "@/composables/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Simpler service object with functions for frontend API calls
export const parameterService = {
  // Create a new parameter
  async createParameter(paramData: Omit<Parameter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Parameter> {
    const response = await fetch(`${API_BASE_URL}/parameters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paramData)
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error creating parameter:', errorResponse);
      throw new Error('Failed to create parameter');
    }
    const successResponse: ParameterResponse = await response.json();
    console.log('Parameter created successfully:', successResponse);
    return successResponse.data;
  },

  // Update an existing parameter
  async updateParameter(id: string, updates: Partial<Parameter>): Promise<Parameter> {
    const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error updating parameter:', errorResponse);
      throw new Error('Failed to update parameter');
    }
    const successResponse: ParameterResponse = await response.json();
    console.log('Parameter updated successfully:', successResponse);
    return successResponse.data;
  },
  
  // Fetch all parameters
  async getAllParameters(): Promise<Parameter[]> {
    const response = await fetch(`${API_BASE_URL}/parameters`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameters:', errorResponse);
      throw new Error('Failed to fetch parameters');
    }
    const successResponse: ParameterListResponse = await response.json();
    console.log('Fetched parameters successfully:', successResponse);
    return successResponse.data;
  },

  // Fetch a parameter by ID
  async getParameterById(id: string): Promise<Parameter> {
    const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameter by ID:', errorResponse);
      throw new Error('Failed to fetch parameter');
    }
    const successResponse: ParameterResponse = await response.json();
    console.log('Fetched parameter by ID successfully:', successResponse);
    return successResponse.data;
  },

  // Fetch a parameter by key
  async getParameterByKey(key: string): Promise<Parameter> {
    const response = await fetch(`${API_BASE_URL}/parameters/key/${key}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameter by key:', errorResponse);
      throw new Error('Failed to fetch parameter');
    }
    const successResponse: ParameterResponse = await response.json();
    console.log('Fetched parameter by key successfully:', successResponse);
    return successResponse.data;
  },

  // Delete a parameter by ID
  async deleteParameter(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error deleting parameter:', errorResponse);
      throw new Error('Failed to delete parameter');
    }
    const responseData = await response.json();
    console.log('Parameter deleted successfully:', responseData);
  }

};
