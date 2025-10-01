// API response types
import type { Parameter } from './parameter';

interface SuccessResponse<T> {
  success: boolean;          // Indicates if the request was successful
  message: string;           // Response message
  timestamp: string;         // Timestamp of the response
  data: T;                   // Response data of generic type T
}

export type ParameterListResponse = SuccessResponse<Parameter[]>;
export type ParameterResponse = SuccessResponse<Parameter>;
export type ConfigResponse = SuccessResponse<JSON>;

export interface ErrorResponse {
  success: boolean;          // Indicates if the request was successful
  message: string;           // Response message
  timestamp: string;         // Timestamp of the response
  error?: string;            // Optional error details (only in development)
};

// API Request Types
export interface CreateParameterRequest {
  parameterKey: string;
  value: string | number | boolean;
  description?: string;
}

export interface UpdateParameterRequest {
  parameterKey?: string;
  value?: string | number | boolean;
  description?: string;
}


// Example response
/* 
  {
    "success":true,
    "message":"Retrieved 2 parameters",
    "data":[
        {"id":"Du7z0FK5LkbLkyiJ9Nf7","parameterKey":"initial","value":"1.1.1","description":"first entity","createdAt":{"_seconds":1758962271,"_nanoseconds":6000000},"updatedAt":{"_seconds":1758962271,"_nanoseconds":6000000}},
        {"id":"NyvU6Dx3mGzpvLSavk6v","parameterKey":"initia","value":"1.1.1","description":"first entity","createdAt":{"_seconds":1758968933,"_nanoseconds":107000000},"updatedAt":{"_seconds":1758968933,"_nanoseconds":107000000}}
      ],
    "timestamp":"2025-09-27T14:15:42.062Z"
  } 
*/