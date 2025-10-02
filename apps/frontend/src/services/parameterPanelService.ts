// Parameter service for handling parameter-related API calls
import type { Parameter } from "../types/parameter"
import type { ErrorResponse, ParameterResponse, ParameterListResponse } from "../types/api"
import { useAuth } from "@/composables/useAuth";
import { correctDateFormat } from "../utils/timestamp";

const { user } = useAuth();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Service object with functions for admin panel API calls
export const parameterPanelService = {

  // Create a new parameter
  async createParameter(paramData: Omit<Parameter, 'id' | 'createdAt' | 'updatedAt'>): Promise<Parameter> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    // Send POST request to create parameter
    const response = await fetch(`${API_BASE_URL}/parameters`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(paramData)
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error creating parameter:', errorResponse);
      throw new Error('Failed to create parameter');
    }

    // Parse and return the successful response
    const successResponse: ParameterResponse = await response.json();
    console.log('Parameter created successfully:', successResponse);

    // Correct the date format before returning
    const correctedResponse = correctDateFormat(successResponse.data);
    return correctedResponse;
  },

  // Update an existing parameter
  async updateParameter(id: string, updates: any, country: string): Promise<Parameter> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    // Send PUT request to update parameter
    const response = await fetch(`${API_BASE_URL}/parameters/${id}?country=${country}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(updates)
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error updating parameter:', errorResponse);
      throw new Error('Failed to update parameter');
    }

    // Parse and return the successful response
    const successResponse: ParameterResponse = await response.json();
    console.log('Parameter updated successfully:', successResponse);
    
    // Correct the date format before returning
    const correctedResponse = correctDateFormat(successResponse.data);
    return correctedResponse;
  },
  
  // Fetch all parameters
  async getAllParametersPanel(): Promise<Parameter[]> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    const response = await fetch(`${API_BASE_URL}/parameters`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameters:', errorResponse);
      throw new Error('Failed to fetch parameters');
    }

    // Parse and return the successful response
    const successResponse: ParameterListResponse = await response.json();
    console.log('Fetched parameters successfully:', successResponse);

    // Correct the date format before returning
    const correctedResponse = successResponse.data.map(correctDateFormat);
    return correctedResponse;
  },

  // Fetch a parameter by ID
  async getParameterById(id: string): Promise<Parameter> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    // Send GET request to fetch parameter by ID
    const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameter by ID:', errorResponse);
      throw new Error('Failed to fetch parameter');
    }

    // Parse and return the successful response
    const successResponse: ParameterResponse = await response.json();
    console.log('Fetched parameter by ID successfully:', successResponse);
    
    // Correct the date format before returning
    const correctedResponse = correctDateFormat(successResponse.data);
    return correctedResponse;
  },

  // Fetch a parameter by key
  async getParameterByKey(key: string): Promise<Parameter> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    // Send GET request to fetch parameter by key
    const response = await fetch(`${API_BASE_URL}/parameters/key/${key}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameter by key:', errorResponse);
      throw new Error('Failed to fetch parameter');
    }

    // Parse and return the successful response
    const successResponse: ParameterResponse = await response.json();
    console.log('Fetched parameter by key successfully:', successResponse);
    
    // Correct the date format before returning
    const correctedResponse = correctDateFormat(successResponse.data);
    return correctedResponse;
  },

  // Delete a parameter by ID
  async deleteParameter(id: string): Promise<void> {
    // Get fresh token for each request
    const token = await user.value?.getIdToken();

    // Send DELETE request to delete parameter by ID
    const response = await fetch(`${API_BASE_URL}/parameters/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error deleting parameter:', errorResponse);
      throw new Error('Failed to delete parameter');
    }

    // Log successful deletion
    try {
      const responseData = await response.json();
      console.log('Parameter deleted successfully:', responseData);
    } catch (e) {
      console.log('Deleted successfully');
    }
  }
};
