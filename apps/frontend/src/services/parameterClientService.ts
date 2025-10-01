// Client service to fetch parameters for Mobile App
import type { ErrorResponse, ConfigResponse, ParameterResponse } from "../types/api"
import type { Parameter } from "@/types/parameter";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Service object with functions for Mobile App API calls
export const parameterClientService = {

  // Get all parameters for Mobile App
  async getAllParametersClient(): Promise<JSON> {
    const response = await fetch(`${API_BASE_URL}/parameters/config`, {
      method: 'GET',
      headers: { 
        'X-API-Token': import.meta.env.VITE_MOBILE_API_TOKEN || 'default-mobile-api-token-2024',
        'Content-Type': 'application/json' 
      }
    });

    // If response not ok, handle errors
    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      console.error('Error fetching parameters for client:', errorResponse);
      throw new Error('Failed to fetch parameters for client');
    }

    // Parse and return the successful response
    const successResponse: ConfigResponse = await response.json();
    console.log('Fetched parameters for client successfully:', successResponse);
    return successResponse.data;
  },

  // Get a parameter by key for Mobile App
  async getParameterByKey(key: string): Promise<Parameter> {
    const response = await fetch(`${API_BASE_URL}/parameters/key/${key}`, {
      method: 'GET',
      headers: { 
        'X-API-Token': import.meta.env.VITE_MOBILE_API_TOKEN || 'default-mobile-api-token-2024',
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
    return successResponse.data;
  } 

}